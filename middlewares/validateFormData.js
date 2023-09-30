const {HttpError} = require("../helpers");
const isEmpty = require('lodash.isempty');

const validateFormData = schema => {
    
    const func = (req, res, next)=> {
      
       console.log("validateFormData");
       console.log("req.body=", req.body);
        // if(isEmpty(req.body)){  
        //     next(HttpError(400, 'missing fields'));
        // }
        // else{
           
            const { error } = schema.validate(req.body);
            if (error) {
                next(HttpError(400, error.message));
                
            }
            next();
        // }
    }

    return func;
}

module.exports = validateFormData;