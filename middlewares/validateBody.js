const {HttpError} = require("../helpers");
const isEmpty = require('lodash.isempty');

const validateBody = schema => {
    
    const func = (req, res, next)=> {

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