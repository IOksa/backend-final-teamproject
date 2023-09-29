const { ctrlWrapper } = require("../../helpers");

const getCurrent=require('./getCurrent');
const updateSubscription=require('./updateSubscription');
const updateAvatar=require('./updateAvatar');
const updateUser=require('./updateUser');

module.exports = {
    getCurrent: ctrlWrapper(getCurrent),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
    updateUser: ctrlWrapper(updateUser),

}