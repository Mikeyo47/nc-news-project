const db = require("../db/connection")

exports.selectArticleById = (article_id) => {
    return db
        .query(
            `SELECT * FROM articles
            WHERE article_id = $1;`,
            [article_id]
        )
        .then(({rows}) => {
            if(rows.length === 0 ) {
                return Promise.reject({status: 404, msg: "Not found!"});
            }
            return rows[0]
        });
}

exports.selectAllArticles = () => {
    return db
        .query(
            `SELECT 
            a.author, 
            a.title, 
            a.article_id, 
            a.topic, 
            a.created_at, 
            a.votes, 
            a.article_img_url, 
            CAST(COUNT(c.comment_id) AS INTEGER) AS comment_count 
            FROM articles a
            LEFT JOIN comments c
            ON a.article_id = c.article_id
            GROUP BY a.article_id
            ORDER BY a.created_at DESC;`
        )
        .then(({rows}) => {
            return rows;
        });
}

exports.updateArticleVotes = (article_id, inc_votes) => {
    return db
        .query(
            `UPDATE articles
            SET votes = votes + $2
            WHERE article_id = $1
            RETURNING *;`,
            [article_id, inc_votes]
        )
        .then(({rows}) => {
            if(rows.length === 0 ) {
                return Promise.reject({status: 404, msg: "Not found!"});
            }
            return rows[0];
        });
}