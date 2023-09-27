const {User} = require("../../models/user");

const { HttpError } = require("../../helpers");

const updateSubscription = async(req, res)=>{
    const {_id} = req.user;
   
    const result = await User.findByIdAndUpdate(_id, req.body,{new: true});
    if(!result) {
        throw HttpError(404, "Not found");
    }
    res.json({
        user:{
            email: result.email,
            subscription: result.subscription,
        }
    });
}
module.exports = updateSubscription;