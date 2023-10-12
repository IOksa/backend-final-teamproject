const { Task } = require("../../models/task");
const { HttpError } = require("../../helpers");

const updateTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!task) {
        throw HttpError(404, "Not found");
    }
    res.json(task);
};

module.exports = updateTask;
