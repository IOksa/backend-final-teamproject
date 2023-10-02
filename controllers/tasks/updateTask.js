const { Task } = require("../../models/task");
const { HttpError } = require("../../helpers");

const updateTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!task) {
        throw HttpError(404, "Not found");
    }
    console.log("task updated");

    res.json({ message: "Task updated" });
};

module.exports = updateTask;
