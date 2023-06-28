const express = require("express");
const endpoints = require("./endpoints.json");
const {
    getTopics
} = require("./controllers/topics.controllers");
const {
    getArticleById
} = require("./controllers/articles.controllers")
const { 
    handlePsqlErrors, 
    handleCustomErrors 
} = require("./errors/errors");

const app = express();

app.get('/api/topics', getTopics);

app.get('/api', (_, res) => {
    res.status(200).send({ endpoints });
});

app.get('/api/articles/:article_id', getArticleById);

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

module.exports = app;