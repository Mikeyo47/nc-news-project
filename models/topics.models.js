const db = require("../db/connection")

function selectAllTopics() {
    return db.query(
        `SELECT *
        FROM topics;`)
    .then((topics) => {
        return topics.rows;
    });
}

module.exports = { selectAllTopics }