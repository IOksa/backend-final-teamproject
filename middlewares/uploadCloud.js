const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");
const Jimp = require("jimp");


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "avatars",
  format: async (req, file) => ["jpg", "jpeg", "png"],
  fileFilter:async (req, file, cb)=>{
    const ext = path.extname(file.originalname).toLowerCase();

    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      console.log("We are in if ext");
      cb(new Error("File type is not supported"), false);
  
    }
    else{
      await Jimp.read(file.originalname)
      .then((img) => img.resize(250, 250).write(file.originalname))
      .catch((err) => {
          console.log(err);
        });
      cb(null, file.originalname);
    } 
  },
    
  
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;