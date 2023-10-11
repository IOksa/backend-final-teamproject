module.exports = (cb) => (req, res, next) => {
    console.log("helpers: try-cath-wrapper");
    return cb(req, res, next).catch((err) => next(err));
};
