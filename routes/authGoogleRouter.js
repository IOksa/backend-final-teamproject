const express = require("express");
// const { Router } = require("express");
const tryCatchWrapper = require("../helpers/try-catch-wrapper");
const {
    googleAuth,
    googleRedirect,
} = require("../controllers/authGoogleConroller");

const router = express.Router();

// gooleAuth

// router.get(
//     '/google',
//     passport.authenticate('google', { scope: ['email', 'profile'] })
// );
// router.get(
//     '/google/callback',
//     passport.authenticate('google', { session: false }),
//     ctrl.authGoogle
// );

// const { Router } = require('express');
// const tryCatchWrapper = require('../helpers/try-catch-wrapper');
// const { googleAuth, googleRedirect } = require('./auth.controller');
// const router = Router();

router.get("/google", tryCatchWrapper(googleAuth));

router.get("/google-redirect", tryCatchWrapper(googleRedirect));

module.exports = router;
