const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const validateFormData = require("./validateFormData");

const isValidTime = require("./isValidTime");

module.exports = {
    validateBody,
    isValidId,
    authenticate,
    validateFormData,

    isValidTime,
};
