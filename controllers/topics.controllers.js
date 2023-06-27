const { 
    selectAllTopics 
} = require("../models/topics.models")

function getTopics(_, res) {
    selectAllTopics().then((topics) => {
        res.status(200).send({topics});
    })
}

module.exports = { getTopics };