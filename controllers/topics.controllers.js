const { 
    selectAllTopics 
} = require("../modules/topics.modules")

function getTopics(_, res) {
    selectAllTopics().then((topics) => {
        res.status(200).send({topics});
    })
}

module.exports = { getTopics };