const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

// const currentData = new Date().toISOString().split("T")[0];
// console.log(currentData);
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
            type: String,
            // type: Date,
            default: new Date().toISOString().split("T")[0],
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
        },
    },
    { versionKey: false, timestamps: true }
);

taskSchema.post("save", handleMongooseError);

const addTaskSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": "missing required title field",
    }),
    start: Joi.string().required().messages({
        "any.required": "missing required start field",
    }),
    end: Joi.string().required().messages({
        "any.required": "missing required end field",
    }),
    priority: Joi.string().required().messages({
        "any.required": "missing required priority field",
    }),
    // date: Joi.date().required().message({
    //     "any.required": "missing required date field",
    // }),
    category: Joi.string().required().messages({
        "any.required": "missing required category field",
    }),
});

const schemas = {
    addTaskSchema,
};

const Task = model("task", taskSchema);

module.exports = { Task, schemas };
