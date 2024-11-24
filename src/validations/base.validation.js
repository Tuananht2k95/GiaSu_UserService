
const baseJoiValidate = (schema, typeData = 'body') => {
    return (req, res, next) => {
        let data = req.body;
        if (typeData == 'query') {
            data = req.query
        }
        if (typeData == 'params') {
            data = req.params
        }        
        
        const result = schema.validate(data);
        
        if (result.error) return res.json(result.error);
        next();
    }
}

export default baseJoiValidate;