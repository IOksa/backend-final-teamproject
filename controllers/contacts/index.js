const { ctrlWrapper } = require("../../helpers");
const getAll = require('./getAll');
const getById=require('./getById');
const add=require('./add');
const updateById=require ('./updateById');
const deleteById=require ('./deleteById');
const updateStatusContact=require('./updateStatusContact');


module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
    updateStatusContact: ctrlWrapper(updateStatusContact),
}