const {User} = require("../../models/user");
const cloudinary = require("cloudinary").v2;
// const uploader = require("./multer");

const { HttpError, handleUpload } = require("../../helpers");

const updateUser = async(req, res)=>{
    const {_id} = req.user;
    let result;
    // const upload = await cloudinary.v2.uploader.upload(req.file.path);

   
    console.log("update user")
    console.log("req.body=", req.body);

    const reqKeyes=Object.keys(req);
    // const isReqFile = reqKeyes.includes('file');
    const isReqFiles = reqKeyes.includes('files');
    
    // if(isReqFile){
    //     console.log("req.file=", req.file);
        
    //     const avatarURL =req.file.path;
    //     const cloudinaryId=req.file.filename;
    //     const updates = {...req.body, avatarURL, cloudinaryId};

    //     console.log("updates=", updates);
    //     if(req.user.cloudinaryId){
    //         await cloudinary.uploader.destroy(req.user.cloudinaryId);
            
    //     }
    //     result = await User.findByIdAndUpdate(_id, {$set: updates},{new: true});
      
    // }

    if(isReqFiles){
        console.log("req.files=", req.files);
        
        const b64 = Buffer.from(req.files.image[0].buffer).toString("base64");
        const dataURI = "data:" + req.files.image[0].mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        console.log("cldRes=", cldRes);
        const cloudinaryId=cldRes.public_id;
        const avatarURL =cldRes.url;
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