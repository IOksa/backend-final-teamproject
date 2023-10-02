const {HttpError} = require("../helpers");
const isEmpty = require('lodash.isempty');

const validateBody = schema => {
    
    const func = (req, res, next)=> {
       console.log("validateBody req.body=", req.body);
       console.log("validateBody req.file=", req.file);
        if(isEmpty(req.body)){  
            
            next(HttpError(400, 'missing fields'));
        }
        else{
           
            const { error } = schema.validate(req.body);
            if (error) {
                next(HttpError(400, error.message));
                
            }
            next();
        }
    }

    return func;
}

module.exports = validateBody;