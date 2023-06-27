const express = require("express");
const {
    getTopics
} = require("./controllers/topics.controllers");
const endpoints = require("./endpoints.json");

const app = express();

app.get('/api/topics', getTopics);

app.get('/api', (_, res) => {
    res.status(200).send({ endpoints });
});

module.exports = app;