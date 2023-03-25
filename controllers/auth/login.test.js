const express = require("express");
const request = require("supertest");

const login = require("./login");

const app = express();

app.post("/api/auth/login", login);

jest.useRealTimers();

describe("Testing the api/auth/login route", () => {
    describe("Should handle post request", () => {
        
    beforeAll(() => app.listen(3000));

    it("Should return 200 status for login", async () => {
        const res = await request(app)
        .post("/api/auth/login");
        expect(res.code).toEqual(200);
    });
  })
})
