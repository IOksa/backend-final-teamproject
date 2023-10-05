const { HttpError } = require("../helpers");

const isValidTime = async (req, res, next) => {
    const { start, end } = req.body;
    const timeStart =
        Number(start.split(":")[0]) * 60 + Number(start.split(":")[1]);
    const timeEnd = Number(end.split(":")[0]) * 60 + Number(end.split(":")[1]);
    if (timeStart > timeEnd) {
        next(HttpError(400, `Time is not valid`));
    }
    next();
};

module.exports = isValidTime;
