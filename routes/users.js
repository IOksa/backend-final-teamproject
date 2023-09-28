const express = require("express");

const ctrl = require("../controllers/users");

const {validateBody, authenticate, upload} = require("../middlewares");

const {schemas} = require("../models/user");

const router = express.Router();

router.get("/current", authenticate, ctrl.getCurrent);

// router.patch("/", authenticate, validateBody(schemas.updateSubscriptionSchema), ctrl.updateSubscription);

// router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

router.patch("/edit", authenticate, validateBody(schemas.updateUserSchema), ctrl.updateUser);

module.exports = router;