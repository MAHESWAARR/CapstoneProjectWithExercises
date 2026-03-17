const request = require("supertest");
const chai = require("chai");
const server = require("../server");

const expect = chai.expect;

let adminToken;

describe("Admin API", () => {

  before(async () => {

    const login = await request(server)
      .post("/api/auth/login")
      .send({
        email: "maheswaarr@gmail.com",
        password: "mahi@123"
      });

    adminToken = login.body.token;

  });

  it("should get all users", async () => {

    const res = await request(server)
      .get("/api/admin/users")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).to.equal(200);

  });

  it("should get pending questions", async () => {

    const res = await request(server)
      .get("/api/admin/pending-qns")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).to.equal(200);

  });

  it("should get pending answers", async () => {

    const res = await request(server)
      .get("/api/admin/pending-ans")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).to.equal(200);

  });

});