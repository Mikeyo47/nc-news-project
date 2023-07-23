const { 
    selectCommentsByArticleId, insertNewComment, deleteComment
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

exports.deleteCommentById = (req, res, next) => {
    const { comment_id } = req.params;
    deleteComment(comment_id).then(() => {
        res.status(204).send();
    })
    .catch((err) => {
        next(err);
    })
}