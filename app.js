const express = require("express");
const endpoints = require("./endpoints.json");
const {
    getTopics
} = require("./controllers/topics.controllers");
const {
    getArticleById, getArticles
} = require("./controllers/articles.controllers")
const {
    getCommentsByArticleId, addNewComment
} = require("./controllers/comments.controllers");
const { 
    handlePsqlErrors, handleCustomErrors, handleServerErrors 
} = require("./errors/errors");

const app = express();
app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api', (_, res) => {
    res.status(200).send({ endpoints });
});

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

app.post('/api/articles/:article_id/comments', addNewComment);

app.all("*", (_, res) => {
    res.status(404).send({ msg: "Not found!"})
})

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;