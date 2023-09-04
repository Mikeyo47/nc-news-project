const express = require("express");
const cors = require('cors');
const endpoints = require("./endpoints.json");
const {
    getAllTopics
} = require("./controllers/topics.controllers");
const {
    getArticleById, getAllArticles, patchArticleVotes
} = require("./controllers/articles.controllers")
const {
    getCommentsByArticleId, postNewComment, deleteCommentById
} = require("./controllers/comments.controllers");
const {
    getAllUsers
} = require("./controllers/users.controllers");
const { 
    handlePsqlErrors, handleCustomErrors, handleServerErrors 
} = require("./errors/errors");

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api', (_, res) => {
    res.status(200).send({ endpoints });
});

app.get('/api/topics', getAllTopics);

app.get('/api/articles', getAllArticles);

app.get('/api/users', getAllUsers);

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

app.post('/api/articles/:article_id/comments', postNewComment);

app.patch('/api/articles/:article_id', patchArticleVotes);

app.delete('/api/comments/:comment_id', deleteCommentById);

app.all("*", (_, res) => {
    res.status(404).send({ msg: "Not found!"})
})

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;