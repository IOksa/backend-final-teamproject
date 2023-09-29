const { Task } = require("../../models/task");

const addTask = async (req, res) => {
    const { _id: owner } = req.body;
    const task = await Task.create({ ...req.body, owner });
    res.json(task);
};

module.exports = addTask;
