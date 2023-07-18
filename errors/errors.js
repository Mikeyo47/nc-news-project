exports.handlePsqlErrors = (err, _, res, next) => {
    if (err.code === "22P02") {
        res.status(400).send({ msg: "Bad request" });
    } else {
        next(err);
    };
};
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