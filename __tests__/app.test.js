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
});

describe("GET /api/articles/:article_id", () => {
    it("should respond with a status code of 200 when user enters existing article_id", () => {
        return request(app)
        .get("/api/articles/2")
        .expect(200);
    });
    it("should respond with a single correctly formatted article object on a key of article", () => {
        return request(app)
        .get("/api/articles/3")
        .then(({body}) => {
            expect(body.article).toEqual(expect.objectContaining({
                author: expect.any(String),
                title: expect.any(String),
                article_id: 3,
                body: expect.any(String),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                article_img_url: expect.any(String)
            }));
        })
    });
    it("should respond with a status code of 400: Bad request when user enters invalid input for article_id", () => {
        return request(app)
        .get("/api/articles/nonsense")
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad request");
        });
    });
    it("should respond with a status code of 404: Not found when user enters valid but non-existing input for article_id", () => {
        return request(app)
        .get("/api/articles/9900")
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("Not found");
        });
    });
});