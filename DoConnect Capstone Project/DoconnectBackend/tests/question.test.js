const request = require("supertest");
const chai = require("chai");
const server = require("../server");

const expect = chai.expect;

let token;

describe("Question API", () => {

  before(async () => {

    const login = await request(server)
      .post("/api/auth/login")
      .send({
        email: "testuser@example.com",
        password: "123456"
      });

    token = login.body.token;

  });

  it("should create question", async () => {

    const res = await request(server)
      .post("/api/questions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Question",
        description: "Test description",
        topic: "NodeJS"
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("question");

  });

  it("should get questions", async () => {

    const res = await request(server)
      .get("/api/questions");

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("questions");

  });

  it("should search questions", async () => {

  const res = await request(server)
    .get("/api/questions/search?q=test");

  expect(res.status).to.equal(200);
  expect(res.body).to.have.property("questions");

});

});