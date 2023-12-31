const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const taskSchema = new Schema(
    {
        title: {
            type: String,
            maxlength: 250,
            required: true,
        },
        start: {
            type: String,
            required: true,
        },
        end: {
            type: String,
            required: true,
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        category: {
            type: String,
            enum: ["to-do", "in-progress", "done"],
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
            require: true,
        },
    },
    { versionKey: false, timestamps: true }
);

taskSchema.post("save", handleMongooseError);

const addTaskSchema = Joi.object({
    title: Joi.string().required().max(250).messages({
        "any.required": "missing required title field",
    }),
    start: Joi.string()
        .required()
        .pattern(/^([0-9]{2})\:([0-9]{2})$/)
        .messages({
            "any.required": "missing required start field",
        }),
    end: Joi.string()
        .required()
        .pattern(/^([0-9]{2})\:([0-9]{2})$/)
        .messages({
            "any.required": "missing required end field",
        }),
    priority: Joi.string().required().messages({
        "any.required": "missing required priority field",
    }),
    date: Joi.string()
        .pattern(
            /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/
        )
        .required(), // .message({"any.required": "missing required date field",}),
    category: Joi.string().required().messages({
        "any.required": "missing required category field",
    }),
});

const editingTaskSchema = Joi.object({
    title: Joi.string().max(250).messages({
        "any.required": "missing required title field",
    }),
    start: Joi.string().pattern(/^([0-9]{2})\:([0-9]{2})$/),
    end: Joi.string().pattern(/^([0-9]{2})\:([0-9]{2})$/),
    priority: Joi.string().messages({
        "any.required": "missing required priority field",
    }),
    date: Joi.string().pattern(
        /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/
    ),
    category: Joi.string().required().messages({
        "any.required": "missing required category field",
    }),
});

const schemas = {
    addTaskSchema,
    editingTaskSchema,
};

const Task = model("task", taskSchema);

module.exports = { Task, schemas };
