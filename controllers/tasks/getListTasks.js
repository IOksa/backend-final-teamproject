const { Task } = require("../../models/task");

const getListTasks = async (req, res) => {
    // const today = new Date().toISOString().slice(0, 10);
    // console.log(today);
    const listTaks = await Task.find();
    res.json(listTaks);
};

module.exports = getListTasks;
