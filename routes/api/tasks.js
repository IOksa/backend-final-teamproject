const express = require("express");
const ctrl = require("../../controllers/tasks");

const router = express.Router();

const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/task");

router.get(
    "/",
    // authenticate,
    ctrl.getListTasks
);

router.post(
    "/",
    // authenticate,
    // validateBody(schemas.addContactSchema),
    ctrl.addTask
);

router.patch(
    "/:id",
    // authenticate,
    // isValidId,
    // validateBody(schemas.updateFavoriteSchema),
    ctrl.updateTask
);

router.delete("/:id", ctrl.deleteTask);

module.exports = router;
