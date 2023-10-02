const express = require("express");
const multer = require("multer");
const ctrl = require("../controllers/users");

const {validateBody, authenticate, validateFormData} = require("../middlewares");

const {schemas} = require("../models/user");

const router = express.Router();
const upload =multer();

router.get("/current", authenticate, ctrl.getCurrent);

// router.patch("/edit", authenticate, uploadCloud.single("image"),ctrl.updateUser);

router.patch("/edit", authenticate, upload.fields([{ name: 'image', maxCount: 1 }]),  validateFormData(schemas.updateUserSchema), ctrl.updateUser);

module.exports = router;