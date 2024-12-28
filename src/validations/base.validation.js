import { responseJsonByStatus, responseError } from "../helpers/helpers.js";

const baseJoiValidate = (schema, typeData = 'body') => {
    
    return (req, res, next) => {        
        let data = req.body;
        if (typeData == 'query') {
            data = req.query
        }
        if (typeData == 'params') {
            data = req.params
        }        
        
        const result = schema.validate(
            data, 
            { abortEarly: false}
        );
        
        if (result.error) {
            return responseJsonByStatus(
                res,
                responseError(result.error),
                422
            );
        }
        next();
    }
}


export default baseJoiValidate;