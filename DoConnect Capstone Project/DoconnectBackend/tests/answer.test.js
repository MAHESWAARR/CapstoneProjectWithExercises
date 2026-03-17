const request = require("supertest");
const chai = require("chai");
const server = require("../server");

const expect = chai.expect;

let token;
let questionId;

describe("Answer API", () => {

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
        title: "Answer Test",
        description: "Answer test question",
        topic: "Testing"
      });

    questionId = question.body.question._id;

  });

  it("should create answer", async () => {

    const res = await request(server)
      .post(`/api/answers/${questionId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        answers: "This is a test answer"
      });

    expect(res.status).to.equal(201);

  });

  it("should get answers of a question", async () => {

  const res = await request(server)
    .get(`/api/answers/${questionId}`);

  expect(res.status).to.equal(200);

});

});