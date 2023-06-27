const app = require('../app');
const seed = require("../db/seeds/seed");
const request = require('supertest');
const db = require('../db/connection');
const data = require("../db/data/test-data");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("GET/api/topics", () => {
    it("returns a status code of 200", () => {
        return request(app)
        .get("/api/topics")
        .expect(200);
    });
    it("should have a 'slug' and 'description' key in each returned object within the topics array", () => {
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
            } else {
                expect(body.topics).toEqual([]);
            }
        });
    });
});