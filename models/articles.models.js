const db = require("../db/connection");
const {
    checkTopicExists
} = require("../db/seeds/utils");

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

exports.selectAllArticles = (topic, sort_by = 'created_at', order = 'desc') => {
    const greenlistSortBy = ['author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count'];
    const greenlistOrder = ['desc', 'asc'];

    const topicValue = [];
    let queryStr = `
        SELECT 
        a.author, 
        a.title, 
        a.article_id, 
        a.topic, 
        a.created_at, 
        a.votes, 
        a.article_img_url, 
        COUNT(c.comment_id)::INT AS comment_count 
        FROM articles a
        LEFT JOIN comments c USING(article_id)
        `;

    if (!greenlistSortBy.includes(sort_by.toLowerCase())) {
        return Promise.reject({status: 400, msg: `Cannot sort by ${sort_by}.`})
    }

    if (!greenlistOrder.includes(order.toLowerCase())) {
        return Promise.reject({status: 400, msg: `Cannot order by ${order}.`})
    }

    if (topic) {
        queryStr += " WHERE a.topic = $1";
        topicValue.push(topic);
    }

    queryStr += `
        GROUP BY a.article_id
        ORDER BY ${sort_by} ${order};`


    return checkTopicExists(topic)
        .then(() => db.query(queryStr, topicValue))
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