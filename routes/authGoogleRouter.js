const express = require("express");
const tryCatchWrapper = require("../helpers/try-catch-wrapper");
const {
    googleAuth,
    googleRedirect,
} = require("../controllers/authGoogleConroller");
const router = express.Router();

router.get("/google", tryCatchWrapper(googleAuth));
router.get("/google-redirect", tryCatchWrapper(googleRedirect));

module.exports = router;
