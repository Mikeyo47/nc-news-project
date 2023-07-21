exports.handlePsqlErrors = (err, _, res, next) => {
    if (err.code === "22P02" || err.code === "23502") {
        res.status(400).send({ msg: "Bad request" })
    } else if (err.code === "23503") {
        res.status(404).send({ msg: "Not found!" })
    } else {
        next(err)
    };
}
exports.handleCustomErrors = (err, _, res, next) => {
    if (err.msg) {
        res.status(err.status).send({ msg: err.msg });
    } else {
        next(err);
    };
};
exports.handleServerErrors = (err, req, res, next) => {
    console.log(err, "<<<<500: custom server error message")
    res.status(500).send({ msg: "Ooops! Something's broken!" });
  };