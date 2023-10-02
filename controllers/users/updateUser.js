const cloudinary = require("cloudinary").v2;
const {User} = require("../../models/user");

const { HttpError, handleUpload } = require("../../helpers");

const updateUser = async(req, res)=>{
    const {_id} = req.user;
    let result;
    console.log("update user")
    console.log("req.body=", req.body);
    console.log("req.file=", req.file);

    const keyes = Object.keys(req);
    const isFile  = keyes.includes('file');

    if(isFile){   
        const cldRes = await handleUpload(req.file.originalname);
        console.log("cldRes=", cldRes);

        const cloudinaryId=cldRes.public_id;
        const avatarURL =cldRes.secure_url;
        const updates = {...req.body, avatarURL, cloudinaryId};

        console.log("avatarURL=", avatarURL);
        console.log("updates=", updates);

        if(req.user.cloudinaryId){
            await cloudinary.uploader.destroy(req.user.cloudinaryId);
            
        }
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