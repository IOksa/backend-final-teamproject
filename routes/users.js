const express = require("express");

const ctrl = require("../controllers/users");

const {validateBody, authenticate, uploadCloud, validateFormData} = require("../middlewares");

const {schemas} = require("../models/user");

const router = express.Router();

router.get("/current", authenticate, ctrl.getCurrent);

router.patch("/edit", authenticate, validateBody(schemas.updateUserSchema), uploadCloud.single("image"),ctrl.updateUser);

// router.patch("/edit", authenticate, validateFormData(schemas.updateUserSchema), uploadCloud.single("image"), ctrl.updateUser);

module.exports = router;