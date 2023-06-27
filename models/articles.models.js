const db = require("../db/connection")

function selectArticleById(articleId) {
    return db.query(
        `SELECT * FROM articles
        WHERE article_id = $1;`,
        [articleId])
    .then((article) => {
        return article.rows[0];
    });
}

module.exports = { selectArticleById }