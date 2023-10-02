const multer = require("multer");
const {HttpError} = require("../helpers");
const {schemas} = require("../models/user");
const path = require('path');
const isEmpty = require('lodash.isempty');

const multerConfig = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
  // Додаємо обмеження на розмір файлу - 5MB
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  // Додаємо фільтр для перевірки типу файлу
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/; // Дозволені розширення файлів
    const mimetype = filetypes.test(file.mimetype); // Перевірка MIME типу файлу
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // Перевірка розширення файлу
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    
    cb(new Error(`File type is not supported, must be ${filetypes}`));
  },
});



const uploadAndValidate = (req, res, next) => {
    upload.single('image')(req, res, (err) => {
   
      if (err) return res.status(400).send(err.message);
      
      const keyes = Object.keys(req);
      const isFile  = keyes.includes('file');

      if(isEmpty(req.body) && !isFile){    
        next(HttpError(400, 'missing fields'));
      }
      else{
          const { error } = schemas.updateUserSchema.validate(req.body);
          if (error) {
              next(HttpError(400, error.message));
              
          }
   
          next();
      }
      

    });
  };

  module.exports=uploadAndValidate;