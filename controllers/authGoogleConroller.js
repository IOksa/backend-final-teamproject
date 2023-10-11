// const queryString = require("querystring");
// import queryString from "query-string";
const queryString = require("query-string");

const { User } = require("../models/user");
const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");

const axios = require("axios");
const { HttpError } = require("../helpers");
// const URL = require("url");

// const { JWT_SECRET, BASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } =
//     process.env;

exports.googleAuth = async (req, res) => {
    console.log("controller googleAuth");
    // console.log(process.env.GOOGLE_CLIENT_ID);
    const stringifiedParams = queryString.stringify({
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
        ].join(" "),
        response_type: "code",
        access_type: "offline",
        prompt: "consent",
    });
    return res.redirect(
        `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
    );
};

exports.googleRedirect = async (req, res) => {
    // console.log("controller googleRedirect");
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    // console.log("fullUrl", fullUrl);
    const urlObj = new URL(fullUrl);
    // console.log("urlObj", urlObj);
    const urlParams = queryString.parse(urlObj.search);
    const code = urlParams.code;
    // console.log("code from urlParams", code);
    const tokenData = await axios({
        url: `https://oauth2.googleapis.com/token`,
        method: "post",
        data: {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,
            grant_type: "authorization_code",
            code,
        },
    });
    const userData = await axios({
        url: "https://www.googleapis.com/oauth2/v2/userinfo",
        method: "get",
        headers: {
            Authorization: `Bearer ${tokenData.data.access_token}`,
        },
    });

    console.log("********** USER INFO *************");
    console.log("name:", userData.data.given_name);
    console.log("email:", userData.data.email);
    console.log("id:", userData.data.id);
    console.log("**********************************");

    const email = userData.data.email;
    const name = userData.data.given_name;
    const avatarURL = userData.data.picture;
    // const password = userData.data.id;
    const password = "password";

    let user = await User.findOne({ email });

    // if (!user) {
    //     // const password = v4();
    //     const password = userData.data.id;
    //     console.log(password);
    //     // const hashPassword = await crypto.hash(password, 10);
    //     user = await User.create({
    //         name,
    //         email,
    //         password,
    //         // : hashPassword,
    //         avatarURL,
    //     });

    // const user = await User.findOne({ email });

    // if (user) {
    //     throw HttpError(409, "Email is used");
    // }

    // const hashPassword = await bcrypt.hash(password, 10);
    // const avatarURL = gravatar.url(email);

    const verificationToken = crypto.randomUUID();

    if (!user) {
        await User.create({
            name,
            email,
            password,
            // : hashPassword,
            // avatarURL,
            verificationToken,
        });
    }

    // const user = await User.findOne({ email });

    // if (!user) {
    //     throw HttpError(401, "Email or password is wrong");
    // }

    // const passwordCompare = await bcrypt.compare(password, user.password);
    // if (!passwordCompare) {
    //     throw HttpError(401, "Email or password is wrong");
    // }

    user = await User.findOne({ email });
    const payload = { id: user._id };
    const { SECRET_KEY } = process.env;
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await User.findByIdAndUpdate(user._id, { token });
    // console.log("token", token);

    // res.status(201).json({
    //     user: {
    //         name: newUser.name,
    //         email: newUser.email,
    //     },
    // });

    // console.log(`User was created`)

    return res.redirect(
        // `https://anigvo.github.io/goosetrack-group6-project/calendar?token=${token}`
        // `https://anigvo.github.io/goosetrack-group6-project/login?token=${token}`
        `https://anigvo.github.io/goosetrack-group6-project/?token=${token}`
        // "https://www.google.com/"
        // `${process.env.FRONTEND_URL}?email=${userData.data.email}`
    );
};

// const { JWT_SECRET, BASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } =
//     process.env;

// const queryString = require("querystring");
// const axios = require("axios");

// const googleAuth = async (req, res) => {
//     const stringifiedParams = queryString.stringify({
//         client_id: GOOGLE_CLIENT_ID,
//         redirect_uri: `${BASE_URL}/auth/google-redirect`,
//         scope: [
//             "https://www.googleapis.com/auth/userinfo.email",
//             "https://www.googleapis.com/auth/userinfo.profile",
//         ].join(" "),
//         response_type: "code",
//         access_type: "offline",
//         prompt: "consent",
//     });
//     return res.redirect(
//         `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
//     );
// };

// const googleRedirect = async (req, res) => {
//     const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
//     const urlObj = new URL(fullUrl);
//     const urlParams = queryString.parse(urlObj.search);
//     const code = urlParams.code;

//     console.log(code);
//     const tokenData = await axios({
//         url: `https://oauth2.googleapis.com/token`,
//         method: "post",
//         data: {
//             client_id: GOOGLE_CLIENT_ID,
//             client_secret: GOOGLE_CLIENT_SECRET,
//             redirect_uri: `${BASE_URL}/auth/google-redirect`,
//             grant_type: "authorization_code",
//             code,
//         },
//     });
//     const userData = await axios({
//         url: "https://www.googleapis.com/oauth2/v2/userinfo",
//         method: "get",
//         headers: {
//             Authorization: `Bearer ${tokenData.data.access_token}`,
//         },
//     });
//     console.log(userData);

//     const user = await User.findOne(userData.data.email);
//     if (user) {
//         throw HttpError(409, "Email in use");
//     }

//     const newUser = await User.create({
//         ...userData,
//         // password: hashPassword,
//         // avatarURL,
//         // verificationToken,
//     });
//     const payload = {
//         id: newUser._id,
//     };
//     const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

//     await User.findByIdAndUpdate(newUser._id, { token });

//     return res.redirect(
//         `${process.env.FRONTEND_URL}/users/?access_token=${token}`
//     );
// };
