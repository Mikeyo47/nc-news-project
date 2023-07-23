const { 
    selectAllTopics 
} = require("../models/topics.models")

exports.getAllTopics = (_, res) => {
    selectAllTopics().then((topics) => {
        res.status(200).send({topics});
    })
}