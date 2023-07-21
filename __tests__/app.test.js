const app = require('../app');
const seed = require("../db/seeds/seed");
const request = require('supertest');
const db = require('../db/connection');
const data = require("../db/data/test-data");
const endpoints = require("../endpoints.json");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe('WRONG PATH ERROR', () => {
    it('returns a status code of 404 and a custom error message when trying to reach any non-existing path', () => {
        return request(app)
            .get('/api/invalid-path')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Not found!');
            });
    });
});

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
                expect(Array.isArray(body.topics)).toBe(true);
                expect(body.topics.length).toBeGreaterThan(0);
                body.topics.forEach(topic => {
                    expect(topic).toEqual(expect.objectContaining({
                        slug: expect.any(String),
                        description: expect.any(String)
                    }));
                })
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
    it("responds with a single object with all required properties on a key of article", () => {
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
                expect(body.msg).toBe("Not found!");
            });
    });
});

describe("GET /api/articles", () => {
    it("responds with a status code of 200 and an array of all articles with required properties sorted in descending order by created_at", () => {
        return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({body}) => {
                expect(Array.isArray(body.articles)).toBe(true);
                expect(body.articles).toHaveLength(13);
                expect(body.articles).toBeSortedBy('created_at', { descending: true });
                body.articles.forEach(article => {
                    expect(article).toEqual(expect.objectContaining({
                        author: expect.any(String),
                        title: expect.any(String),
                        article_id: expect.any(Number),
                        topic: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                        comment_count: expect.any(Number)
                    }))
                    expect(article.body).not.toBeDefined();
                })
            })
    })
})

describe("GET /api/articles/:article_id/comments", () => {
    it("responds with a status code of 200 and an array of all comments with required properties sorted in descending order by created_at", () => {
        return request(app)
            .get("/api/articles/3/comments")
            .expect(200)
            .then(({body}) => {
                expect(Array.isArray(body.comments)).toBe(true);
                expect(body.comments).toHaveLength(2);
                expect(body.comments).toBeSortedBy('created_at', { descending: true });
                body.comments.forEach(comment => {
                    expect(comment).toEqual(expect.objectContaining({
                        comment_id: expect.any(Number),
                        article_id: 3,
                        author: expect.any(String),
                        body: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number)
                    }))
                })
            })
    })
    it("should respond with a status code of 400: Bad request when user enters invalid input for article_id", () => {
        return request(app)
            .get("/api/articles/nonsense/comments")
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("Bad request");
            });
    });
    it("should respond with a status code of 404: Not found when user enters valid but non-existing input for article_id", () => {
        return request(app)
            .get("/api/articles/9900/comments")
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe("Not found!");
            });
    });
})

describe("POST /api/articles/:article_id/comments", () => {
    it("responds with a status code of 201 and an object of the posted comment", () => {
        return request(app)
            .post("/api/articles/3/comments")
            .send({
                body: "Nice pugs!",
                username: "lurker"
                })
            .expect(201)
            .then(({body}) => {
                expect(body.postedComment).toEqual(expect.objectContaining({
                    comment_id: 19,
                    article_id: 3,
                    author: "lurker",
                    body: "Nice pugs!",
                    created_at: expect.any(String),
                    votes: 0
                }))
            })
    })
    it("should respond with a status code of 400: Bad request when user enters invalid input for article_id", () => {
        return request(app)
            .post("/api/articles/nonsense/comments")
            .send({
                body: "Nice pugs!",
                username: "lurker"
                })
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("Bad request");
            });
    });
    it("should respond with a status code of 404: Not found when user enters valid but non-existing input for article_id", () => {
        return request(app)
            .post("/api/articles/9900/comments")
            .send({
                body: "Nice pugs!",
                username: "lurker"
                })
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe("Not found!");
            });
    });
    it("should respond with a status code of 404: Not found when user posts a comment with nonexistent username", () => {
        return request(app)
            .post("/api/articles/4/comments")
            .send({
                body: "Nice pugs!",
                username: "yoyo"
                })
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe("Not found!");
            });
    });
    it("should respond with a status code of 400: Bad request when user enters comment with missing values", () => {
        return request(app)
            .post("/api/articles/5/comments")
            .send({
                username: "lurker"
                })
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("Bad request");
            });
    });
    it("responds with a status code of 201 and an object of the posted comment, ignoring extra properties", () => {
        return request(app)
            .post("/api/articles/5/comments")
            .send({
                body: "Catz are coming!",
                username: "rogersop",
                extra: "stuff"
                })
            .expect(201)
            .then(({body}) => {
                expect(body.postedComment).toEqual(expect.objectContaining({
                    comment_id: 19,
                    article_id: 5,
                    author: "rogersop",
                    body: "Catz are coming!",
                    created_at: expect.any(String),
                    votes: 0
                }))
            })
    });
})