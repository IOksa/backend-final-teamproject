const {Schema, model} = require("mongoose");
const Joi = require("joi");
const {handleMongooseError} = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const phoneRegexp = /^\d{2}\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}/;

const currentTime = new Date();

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
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
        maxlength: 100,
    },

    birthday:{
        type: Date,
        default: currentTime,
 
    },

    phone: {
        type: String,
        default:"",
        match: phoneRegexp,
       
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

    },

    cloudinaryId: {
        type: String,
    },

   
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
        'string.base': '"name" should be a type of "string"',
        'string.empty': '"name" cannot be an empty field',
        'any.required': 'missing required name field',
        'any.only': 'name must be min 2 and max 100 symbols',
      }),
    email: Joi.string().pattern(emailRegexp).required().messages({
        'string.base': '"email" should be a type of "string"',
        'string.empty': '"email" cannot be an empty field',
        'any.required': 'missing required email field'
      }),
    password: Joi.string().min(6).max(100).required().messages({
        'string.base': '"password" should be a type of "string"',
        'string.empty': '"password" cannot be an empty field',
        'any.required': 'missing required password field',
        'any.only': 'password must be min 6 and max 100 symbols',
      }),
      
    
})

const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().pattern(emailRegexp).required().messages({
        'string.base': '"email" should be a type of "string"',
        'string.empty': '"email" cannot be an empty field',
        'any.required': 'missing required email field'
      }),
    password: Joi.string().min(6).max(100).required().messages({
        'string.base': '"password" should be a type of "string"',
        'string.empty': '"password" cannot be an empty field',
        'any.required': 'missing required password field',
        'any.only': 'password must be min 6 and max 100 symbols',

      }),
  

})


const updateUserSchema=Joi.object({
    name: Joi.string().min(2).max(100).messages({
        'string.base': '"name" should be a type of "string"',
        'string.empty': '"name" cannot be an empty field',
        'any.required': 'missing required name field',
        'any.only': 'name must be min 2 and max 100 symbols',
      }),
    email: Joi.string().email().lowercase().pattern(emailRegexp).messages({
        'string.base': '"email" should be a type of "string"',
        'string.empty': '"email" cannot be an empty field',
        'any.required': 'missing required email field'
    }), 
    birthday: Joi.date().min('1-1-1900').max('now'),
    phone: Joi.string().pattern(phoneRegexp).min(18).max(18).messages({
        'any.only': 'phone must be a string with format "xx (xxx) xxx xx xx" - only numbers, (,) and spaces',
        'string.pattern.base': 'phone must be a string with format "xx (xxx) xxx xx xx" - only numbers, (,) and spaces',
    }),
    skype:Joi.string(),

})

const schemas = {
    registerSchema,
    loginSchema,
    updateUserSchema,

}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}