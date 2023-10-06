const { Task } = require("../../models/task");

const addTask = async (req, res) => {
    const { _id: owner } = req.user;

    const task = await Task.create({ ...req.body, owner });
    res.status(201).json(task);
};

module.exports = addTask;
