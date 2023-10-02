const {HttpError} = require("../helpers");
const isEmpty = require('lodash.isempty');
const path = require("path");

const validateFormData = schema => {

    const func = (req, res, next)=> {
       console.log("validateFormData");
         if(isEmpty(req.body) && isEmpty(req.files)){  
            next(HttpError(400, 'missing fields'));
         }
         else{
            console.log("req.body", req.body);
             const { error } = schema.validate(req.body);
             if (error) {
                 next(HttpError(400, error.message));
                 
             }
             console.log('req.files=', req.files)
     
             if(!isEmpty(req.files)){
                const ext = path.extname(req.files.image[0].originalname).toLowerCase();
                if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
                    next(HttpError(400, "File type is not supported, must be jpg, jpeg or png"));
                }
            }
            next();
         }
     }
 
     return func;
}

module.exports = validateFormData;