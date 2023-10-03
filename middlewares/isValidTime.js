// const { Task } = require("../../models/task");
const { HttpError } = require("../helpers");

const isValidTime = async (req, res, next) => {
    // const { _id: owner } = req.user;
    // console.log(req.body);
    const { start, end } = req.body;
    // console.log(start);
    const timeStart =
        Number(start.split(":")[0]) * 60 + Number(start.split(":")[1]);
    const timeEnd = Number(end.split(":")[0]) * 60 + Number(end.split(":")[1]);
    // console.log(timeStart, timeEnd);
    if (timeStart > timeEnd) {
        next(HttpError(400, `Time is not valid`));
    }
    next();
};

module.exports = isValidTime;
