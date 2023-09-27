const {HttpError} = require("../helpers");
const isEmpty = require('lodash.isempty');

const validateBody = schema => {
    
    const func = (req, res, next)=> {
       
        if(isEmpty(req.body)){  
            if(req.method==='PATCH'){
                const field=req.route.path.slice(5);
                next(HttpError(400, `missing field ${field}`));
            }
            else{
                next(HttpError(400, 'missing fields'));
            }
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