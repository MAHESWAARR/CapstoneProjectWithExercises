const request = require("supertest");
const chai = require("chai");
const server = require("../server");

const expect = chai.expect;

let token;
let questionId;
let answerId;

describe("Likes API", () => {

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
        title: "Like Question",
        description: "Like Test",
        topic: "Test"
      });

    questionId = question.body.question._id;

    const answer = await request(server)
      .post(`/api/answers/${questionId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        answers: "Like answer"
      });

    answerId = answer.body.answerBody._id;

  });

  it("should like an answer", async () => {

    const res = await request(server)
      .post(`/api/likes/${answerId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.be.oneOf([200,400]);

  });

  it("should get likes count", async () => {

    const res = await request(server)
      .get(`/api/likes/${answerId}`);

    expect(res.status).to.equal(200);

  });

  it("should unlike answer", async () => {

    const res = await request(server)
      .delete(`/api/likes/${answerId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);

  });

});