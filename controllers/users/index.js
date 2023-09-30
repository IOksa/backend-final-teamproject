const { ctrlWrapper } = require("../../helpers");

const getCurrent=require('./getCurrent');
const updateUser=require('./updateUser');

module.exports = {
    getCurrent: ctrlWrapper(getCurrent),
    updateUser: ctrlWrapper(updateUser),

}