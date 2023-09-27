const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const crypto = require("node:crypto");

const {User} = require("../../models/user");

const {HttpError, sendEmail} = require("../../helpers");

const {BASE_URL} = process.env;

const register = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user){
        throw HttpError(409, "Email is used");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = crypto.randomUUID();

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL, verificationToken});


    res.status(201).json({
        user:{
            email: newUser.email,
            subscription: newUser.subscription,
        }
    })
}


module.exports = register;