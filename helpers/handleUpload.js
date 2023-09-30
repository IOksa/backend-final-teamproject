const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  
async function handleUpload(file) {
const res = await cloudinary.uploader.upload(file, {
    folder: "avatars",
    resource_type: "auto",
});
return res;
}

module.exports = handleUpload;