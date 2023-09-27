const {Schema, model} = require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require("../helpers");

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Set password for user'],

    },

    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },

    token: {
        type: String,
        default: ""
    },
    avatarURL: {
        type: String,
        required: true,
    },
   
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    email: Joi.string().required().messages({
        'string.base': '"email" should be a type of "string"',
        'string.empty': '"email" cannot be an empty field',
        'any.required': 'missing required email field'
      }),
    password: Joi.string().required().messages({
        'string.base': '"password" should be a type of "string"',
        'string.empty': '"password" cannot be an empty field',
        'any.required': 'missing required password field'
      }),
      
    subscription: Joi.string(),
})

const loginSchema = Joi.object({
    email: Joi.string().required().messages({
        'string.base': '"email" should be a type of "string"',
        'string.empty': '"email" cannot be an empty field',
        'any.required': 'missing required email field'
      }),
    password: Joi.string().required().messages({
        'string.base': '"password" should be a type of "string"',
        'string.empty': '"password" cannot be an empty field',
        'any.required': 'missing required password field'
      }),
      
})


const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
})

const schemas = {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema,
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}