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