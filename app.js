const express = require("express");
const endpoints = require("./endpoints.json");
const {
    getTopics
} = require("./controllers/topics.controllers");
const {
    getArticleById, getArticles, getCommentsByArticleId
} = require("./controllers/articles.controllers")
const { 
    handlePsqlErrors, handleCustomErrors, handleServerErrors 
} = require("./errors/errors");

const app = express();

app.get('/api/topics', getTopics);

app.get('/api', (_, res) => {
    res.status(200).send({ endpoints });
});

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

app.all("*", (_, res) => {
    res.status(404).send({ message: "Not found!"})
})

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;