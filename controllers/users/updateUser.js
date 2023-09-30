const {User} = require("../../models/user");
// const cloudinary = require("./cloudinary");
// const uploader = require("./multer");

const { HttpError } = require("../../helpers");

const updateUser = async(req, res)=>{
    const {_id} = req.user;
    let result;
    // const upload = await cloudinary.v2.uploader.upload(req.file.path);

   
    console.log("update user")

    const reqKeyes=Object.keys(req);
    const isReqFile = reqKeyes.includes('file');
    
    if(isReqFile){
        console.log("req.file.path=", req.file.path);
        const avatarURL =req.file.path;
        const updates = {...req.body, avatarURL};
        
        result = await User.findByIdAndUpdate(_id, {$set: updates},{new: true});
    }
    else{
        result = await User.findByIdAndUpdate(_id, req.body,{new: true});
    }
    if(!result) {
        throw HttpError(404, "Not found");
    }

    res.json({
        user:{
            name: result.name,
            email: result.email,
            birthday: result.birthday,
            phone: result.phone,
            skype: result.skype,
            avatarURL: result.avatarURL,
        
        }
    });
    

};
module.exports = updateUser;