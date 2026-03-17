const request = require("supertest");
const chai = require("chai");
const server = require("../server");

const expect = chai.expect;

describe("Auth API", () => {

  it("should register a new user", async () => {

    const res = await request(server)
      .post("/api/auth/register")
      .send({
        name: "Test User3",
        email: "testuser3@example.com",
        password: "123456"
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("token");

  });

  it("should login user", async () => {

    const res = await request(server)
      .post("/api/auth/login")
      .send({
        email: "testuser@example.com",
        password: "123456"
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");

  });

  it("should fail login with wrong password", async () => {

  const res = await request(server)
    .post("/api/auth/login")
    .send({
      email: "testuser333@example.com",
      password: "wrongpas33s"
    });

  expect(res.status).to.equal(400);

});

});