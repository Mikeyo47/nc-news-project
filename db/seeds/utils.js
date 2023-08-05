const db = require("../connection");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createRef = (arr, key, value) => {
  return arr.reduce((ref, element) => {
    ref[element[key]] = element[value];
    return ref;
  }, {});
};

exports.formatComments = (comments, idLookup) => {
  return comments.map(({ created_by, belongs_to, ...restOfComment }) => {
    const article_id = idLookup[belongs_to];
    return {
      article_id,
      author: created_by,
      ...this.convertTimestampToDate(restOfComment),
    };
  });
};

exports.checkTopicExists = (topic) => {
  return db
    .query(
      `SELECT * 
      FROM topics
      WHERE slug = $1;`,
      [topic])
    .then(({rows}) => {
      if (rows.length === 0 && topic) {
        return Promise.reject({status: 404, msg: `${topic} not found!`})
      }
    })
}

exports.checkCommentExists = (comment_id) => {
  return db
    .query(
      `SELECT *
      FROM comments
      WHERE comment_id = $1;`,
      [comment_id])
    .then(({rows}) => {
      if (rows.length === 0) {
        return Promise.reject({status: 404, msg: `Comment ID number ${comment_id} does not exist!`})
      } 
    })
}
