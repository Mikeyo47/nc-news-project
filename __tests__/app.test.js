const app = require('../app');
const seed = require("../db/seeds/seed");
const request = require('supertest');
const db = require('../db/connection');
const data = require("../db/data/test-data");
const endpoints = require("../endpoints.json");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("GET /api/topics", () => {
    it("responds with a status code of 200", () => {
        return request(app)
        .get("/api/topics")
        .expect(200);
    });
    it("should have a 'slug' and 'description' property in each returned object within the topics array", () => {
        return request(app)
        .get("/api/topics")
        .then(({body}) => {
            if (body.topics.length > 0) {
                body.topics.forEach(topic => {
                    expect(topic).toEqual(expect.objectContaining({
                        slug: expect.any(String),
                        description: expect.any(String)
                    }));
                })
            }
        });
    });
});

describe("GET /api", () => {
    it("should respond with status code 200 and an object describing all the available endpoints", () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then(({body}) => {
             expect(body.endpoints).toEqual(endpoints);
        });
    });
    it("should check that the response object is not empty", () => {
        return request(app)
        .get("/api/")
        .then(({body}) => {
            expect(Object.keys(body.endpoints).length).toBeGreaterThan(0);
        });
    });
})