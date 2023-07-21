const db = require("../db/connection")

exports.selectCommentsByArticleId = (article_id) => {
    return db.query(
        `SELECT * FROM comments
        WHERE article_id = $1
        ORDER BY created_at DESC;`,
        [article_id])
    .then(({rows}) => {
        if(rows.length === 0 ) {
            return Promise.reject({status: 404, msg: "Not found!"});
        }
        return rows;
    });
}

exports.postNewComment = (article_id, body, username) => {
    return db
        .query(`INSERT INTO comments
        (article_id, author, body)
        VALUES
        ($1, $2, $3)
        RETURNING *;`,
        [article_id, username, body])
    .then(({ rows }) => {
            return rows[0];
        })
}