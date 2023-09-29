const validateBody = require("./validateBody");
const isValidId=require("./isValidId");
const authenticate = require("./authenticate");
const upload = require("./upload");
const uploadCloud = require("./uploadCloud");
const validateFormData = require("./validateFormData");

module.exports = {
    validateBody,
    isValidId,
    authenticate,
    upload,
    uploadCloud,
    validateFormData,


}