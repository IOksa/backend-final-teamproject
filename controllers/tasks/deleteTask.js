const { Task } = require("../../models/task");
const { HttpError } = require("../../helpers");

const deleteTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByIdAndRemove(id);
    if (!task) {
        throw HttpError(404, "Not found");
    }
    res.json({ message: "Task deleted" });
};

module.exports = deleteTask;
