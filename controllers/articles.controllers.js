const { 
    selectArticleById 
} = require("../models/articles.models")

function getArticleById(req, res) {
	const articleId = req.params.article_id;
    selectArticleById(articleId).then((article) => {
        res.status(200).send({ article });
    })
}

module.exports = { getArticleById };