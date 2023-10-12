const queryString = require("query-string");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { v4 } = require("uuid");

const { User } = require("../models/user");

const { BASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SECRET_KEY } =
    process.env;

exports.googleAuth = async (req, res) => {
    const stringifiedParams = queryString.stringify({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: `${BASE_URL}/auth/google-redirect`,
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
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const urlObj = new URL(fullUrl);
    const urlParams = queryString.parse(urlObj.search);
    const code = urlParams.code;
    const tokenData = await axios({
        url: `https://oauth2.googleapis.com/token`,
        method: "post",
        data: {
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            redirect_uri: `${BASE_URL}/auth/google-redirect`,
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
    console.log("avatar:", userData.data.picture);
    console.log("**********************************");

    const email = userData.data.email;
    const name = userData.data.given_name;
    const avatarURL = userData.data.picture;

    let user = await User.findOne({ email });

    if (!user) {
        const password = v4();
        const hashPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashPassword,
            avatarURL,
        });
        user = await User.findOne({ email });
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await User.findByIdAndUpdate(user._id, { token });

    return res.redirect(
        `https://anigvo.github.io/goosetrack-group6-project/?token=${token}`
    );
};
