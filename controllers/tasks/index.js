const addTask = require("./addTaks");
const deleteTask = require("./deleteTask");
const getListTasks = require("./getListTasks");
const updateTask = require("./updateTask");

const ctrlWrapper = require("../../helpers/ctrlWrapper");

module.exports = {
    addTask: ctrlWrapper(addTask),
    deleteTask: ctrlWrapper(deleteTask),
    getListTasks: ctrlWrapper(getListTasks),
    updateTask: ctrlWrapper(updateTask),
};
