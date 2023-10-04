const { Task } = require("../../models/task");

const addTask = async (req, res) => {
    const { _id: owner } = req.user;
    // // console.log(req.body);
    // const { start, end } = req.body;
    // // console.log(start);
    // const timeStart =
    //     Number(start.split(":")[0]) * 60 + Number(start.split(":")[1]);
    // const timeEnd = Number(end.split(":")[0]) * 60 + Number(end.split(":")[1]);
    // console.log(timeStart, timeEnd);

    // console.log("start", typeof start);
    // // const tmp = `1970-01-01T${start}:00`;
    // // console.log(tmp);
    // // const end = new Date(tmp);
    // console.log("end", end);

    // var hms = "01:12:33";
    // var target = new Date("1970-01-01T" + hms);

    // const righеTime =
    //     new Date(`1970-01-01T${end}`) - new Date("1970-01-01T" + start);
    // console.log(righеTime);

    //  if (!user) {
    //      throw HttpError(401, "Email or password is wrong");
    //  }

    const task = await Task.create({ ...req.body, owner });
    res.status(201).json(task);
};

module.exports = addTask;
