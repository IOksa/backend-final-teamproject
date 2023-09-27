const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const { User } = require("../../models/user");

const { DB_HOST } = process.env;


describe("Test register", () => {
    beforeAll(async () => {
      await mongoose.connect(DB_HOST);
      await User.deleteMany();
    });
  
    afterAll(async () => {
      await mongoose.disconnect(DB_HOST);
    });
 
    it("should register new user", async () => {
      const response = await request(app).post("/users/register").send({
        email: "testUser1@gmail.com",
        password: "123456",
      });
  
      expect(response.statusCode).toBe(201);
      expect(response.body.user.email).toBe("testUser1@gmail.com");
    });
  
    it("status code 409 register", async () => {
      await request(app).post("/users/register").send({
        email: "testUser2@gmail.com",
        password: "123456",
      });
  
      const response = await request(app).post("/users/register").send({
        email: "testUser2@gmail.com",
        password: "123456",
      });
  
      expect(response.statusCode).toBe(409);
    });
  });
