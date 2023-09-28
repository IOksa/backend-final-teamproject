const {Schema, model} = require("mongoose");
const addLeadingZero = require('../helpers/addLeadingZero');
const Joi = require("joi");

const {handleMongooseError} = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const phoneRegexp = /^\d{2}\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}/;

const currentTime = new Date();
const month=addLeadingZero(currentTime.getMonth());
const day=addLeadingZero(currentTime.getDate());
const currentDate=`${day}/${month}/${currentTime.getFullYear()}`;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        match: emailRegexp,
    },
    password: {
        type: String,
        required: [true, 'Set password for user'],
        minlength: 6,
        maxlength: 255,
    },

    birthday:{
        type: String,
        minlength: 10,
        maxlength: 10,
        default: currentDate,
    },

    phone: {
        type: String,
        default:"",
        match: phoneRegexp,
        minlength: 18,
        maxlength: 18,
     
    },

    skype: {
        type: String,
        default:"",
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
    name: Joi.string().min(2).max(255).required().messages({
        'string.base': '"name" should be a type of "string"',
        'string.empty': '"name" cannot be an empty field',
        'any.required': 'missing required name field',
        'any.only': 'name must be min 2 and max 255 symbols',
      }),
    email: Joi.string().pattern(emailRegexp).required().messages({
        'string.base': '"email" should be a type of "string"',
        'string.empty': '"email" cannot be an empty field',
        'any.required': 'missing required email field'
      }),
    password: Joi.string().min(6).max(255).required().messages({
        'string.base': '"password" should be a type of "string"',
        'string.empty': '"password" cannot be an empty field',
        'any.required': 'missing required password field',
        'any.only': 'password must be min 6 and max 255 symbols',
      }),
      
    subscription: Joi.string(),
})

const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().pattern(emailRegexp).required().messages({
        'string.base': '"email" should be a type of "string"',
        'string.empty': '"email" cannot be an empty field',
        'any.required': 'missing required email field'
      }),
    password: Joi.string().min(6).max(255).required().messages({
        'string.base': '"password" should be a type of "string"',
        'string.empty': '"password" cannot be an empty field',
        'any.required': 'missing required password field',
        'any.only': 'password must be min 6 and max 255 symbols',

      }),
  

})


const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
})

const updateUserSchema=Joi.object({
    name: Joi.string().min(2).max(255).required().messages({
        'string.base': '"name" should be a type of "string"',
        'string.empty': '"name" cannot be an empty field',
        'any.required': 'missing required name field',
        'any.only': 'name must be min 2 and max 255 symbols',
      }),
    email: Joi.string().email().lowercase().pattern(emailRegexp).required().messages({
        'string.base': '"email" should be a type of "string"',
        'string.empty': '"email" cannot be an empty field',
        'any.required': 'missing required email field'
    }), 
    birthday: Joi.string().min(10).max(10),
    phone: Joi.string().pattern(phoneRegexp).min(18).max(18).messages({
        'any.only': 'phone must be 18 symbols',
        'string.pattern.base':
        'phone must be a string with only numbers, (,) and spaces',
    }),
    skype:Joi.string(),
})

const schemas = {
    registerSchema,
    loginSchema,
    updateUserSchema,
    updateSubscriptionSchema,
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}