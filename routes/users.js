const express = require("express");


const ctrl = require("../controllers/users");

const {validateBody, authenticate, uploadCloud, validateFormData, upload} = require("../middlewares");

const {schemas} = require("../models/user");

const router = express.Router();

router.get("/current", authenticate, ctrl.getCurrent);

// router.patch("/edit", authenticate, uploadCloud.single("image"),ctrl.updateUser);

router.patch("/edit", authenticate, upload.fields([{ name: 'image', maxCount: 1 }]), validateBody(schemas.updateUserSchema), ctrl.updateUser);

module.exports = router;