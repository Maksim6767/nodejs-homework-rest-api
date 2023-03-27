const express = require("express");
const request = require("supertest");

const login = require("./login");

const app = express();

app.post("/api/auth/login", login);

jest.useRealTimers();
const testTimeout = 10000;

    describe("Should handle post request", () => {
    const server = app.listen(3000);   
    beforeAll(() => server);
    afterAll(() => server.close());

    test("Should return 200 status for login", async () => {
        const res = await request(app).post("/api/auth/login");
        expect(res.status).toEqual(200);
    }, testTimeout);
  })

