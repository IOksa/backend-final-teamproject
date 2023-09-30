const {HttpError} = require("../helpers");
const multer = require("multer");

const isEmpty = require('lodash.isempty');

const validateFormData = schema => {

    
    const func = (req, res, next)=> {
        multer.none();
      
       console.log("validateFormData");
       console.log("req.body=", req.body);
        // if(isEmpty(req.body)){  
        //     next(HttpError(400, 'missing fields'));
        // }
        // else{
           
            const { error } = schema.validate(req.body);
            console.log(error);
            if (error) {
                next(HttpError(400, error.message));
                
            }
            next();
        // }
    }

    return func;
}

module.exports = validateFormData;