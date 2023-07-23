const { 
    selectCommentsByArticleId, insertNewComment
} = require("../models/comments.models")

exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    selectCommentsByArticleId(article_id).then((comments) => {
        res.status(200).send({ comments });
    })
    .catch((err) => {
        next(err);
    });
}

exports.postNewComment = (req, res, next) => {
    const { article_id } = req.params;
    const { body, username } = req.body;
    insertNewComment(article_id, body, username).then((postedComment) => {
        res.status(201).send({ postedComment });
    })
    .catch((err) => {
        next(err);
    });
}