const express = require("express");

const ctrl = require("../controllers/users");

const {authenticate, uploadAndValidate} = require("../middlewares");

const router = express.Router();

router.get("/current", authenticate, ctrl.getCurrent);

router.patch("/edit", authenticate, uploadAndValidate, ctrl.updateUser);

module.exports = router;