const request = require("supertest");
const chai = require("chai");
const server = require("../server");

const expect = chai.expect;

let token;
let questionId;
let answerId;
let commentId;

describe("Comments API", () => {

  before(async () => {

    const login = await request(server)
      .post("/api/auth/login")
      .send({
        email: "testuser@example.com",
        password: "123456"
      });

    token = login.body.token;

    const question = await request(server)
      .post("/api/questions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Question",
        description: "Test Description",
        topic: "Test"
      });

    questionId = question.body.question._id;

    const answer = await request(server)
      .post(`/api/answers/${questionId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        answers: "Test answer"
      });

    answerId = answer.body.answerBody._id;

  });

  it("should create comment", async () => {

    const res = await request(server)
      .post(`/api/comments/${answerId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        comment: "Nice"
      });

    commentId = res.body.comment._id;

    expect(res.status).to.equal(201);

  });

  it("should get comments of answer", async () => {

    const res = await request(server)
      .get(`/api/comments/${answerId}`);

    expect(res.status).to.equal(200);

  });

  it("should delete own comment", async () => {

    const res = await request(server)
      .delete(`/api/comments/delete/${commentId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);

  });

});