const express = require("express");
const request = require("supertest");

// const login = require("./login");

const app = express();

// app.post("/api/auth/login", login);

    describe("Should handle post request", () => {  
        beforeAll(() => app.listen(3000));
    // afterAll(() => app.close());

        test("should return 200 status for login", async () => {
            const response = await request(app).post("/api/auth/login");
            console.log(response);
            // expect(response.status).toBe(200);
    });
  })

