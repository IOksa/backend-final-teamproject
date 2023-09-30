const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const RATING_TYPE = [1, 2, 3, 4, 5];

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      enum: RATING_TYPE,
      required: [true, "Rating is required"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

reviewSchema.post("save", handleMongooseError);

const Review = model("review", reviewSchema);

const reviewValidateSchema = Joi.object({
  rating: Joi.number()
    .valid(...RATING_TYPE)
    .required()
    .messages({
      "number.base": "rating must be a type of number",
      "string.empty": "rating cannot be an empty field",
      "any.required": "missing required rating field",
      "any.only": "rating must be one of next types: 1, 2, 3, 4, 5",
    }),
  comment: Joi.string()
    .pattern(/^(?!\s)(.*\S)(?<!\s)$/)
    .required()
    .messages({
      "string.base": "comment must be a type of string",
      "string.empty": "comment cannot be an empty field",
      "any.required": "missing required comment field",
      "string.pattern.base":
        "comment must be a string without spaces at the beginning and end of the string",
    }),
});

module.exports = { Review, reviewValidateSchema };
