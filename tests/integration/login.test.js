const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");

const { DB_HOST } = process.env;

describe("Test Login Controller", () => {
    beforeAll(async () => {
        await mongoose.connect(DB_HOST);
    });

    afterAll(async () => {
        await mongoose.disconnect(DB_HOST);
    });

    it("should login user", async () => {
        const response = await request(app).post("/users/login").send({
            email: "testUser1@gmail.com",
            password: "123456",
        });
            
        expect(response.statusCode).toBe(200);
    
        expect(response.body.user.email).toBe("testUser1@gmail.com");
    
        expect(typeof response.body.token).toBe("string");
    
        const tokenLength=response.body.token.length;
        let isToken = false;
        if(tokenLength>0){
            isToken=true;
            expect(isToken).toBe(true);
        }
            
        expect(typeof response.body.user).toBe("object");
        expect(typeof response.body.user.email).toBe("string");
        expect(typeof response.body.user.subscription).toBe("string");
    });


    it("should not login not registered user - email", async () => {
        const response = await request(app).post("/users/login").send({
          email: "testUser3@gmail.com",
          password: "123456",
        });
    
        expect(response.statusCode).toBe(401);
    });
    
    it("should not login not registered user - password", async () => {
        const response = await request(app).post("/users/login").send({
            email: "testUser1@gmail.com",
            password: "1234567",
        });

        expect(response.statusCode).toBe(401);
    });

    test("email should be string", async () => {

        expect(() => request(app).post("/users/login").send({
          email: 1234,
          password: "123456"}).toThrow('email must be String'));
    });

    test("password should be string", async () => {

        expect(() => request(app).post("/users/login").send({
            email: "testUser2@gmail.com",
            password: 123456}).toThrow('password must be String'));
    });

});

