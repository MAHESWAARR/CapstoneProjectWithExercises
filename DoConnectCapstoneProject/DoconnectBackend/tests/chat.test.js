const request = require("supertest");
const chai = require("chai");
const server = require("../server");

const expect = chai.expect;

let token;
let userId;

describe("Chat API", () => {

  before(async () => {

    const login = await request(server)
      .post("/api/auth/login")
      .send({
        email: "testuser@example.com",
        password: "123456"
      });

    token = login.body.token;

    const users = await request(server)
      .get("/api/admin/users")
      .set("Authorization", `Bearer ${token}`);

    userId = users.body[0]._id;

  });

  it("should get chat history", async () => {

    const res = await request(server)
      .get(`/api/chat/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);

  });

});