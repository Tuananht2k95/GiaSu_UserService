import { parserJWTToken } from "../helpers/helpers.js";
import { User } from "../models/user.model.js";
import { responseJsonByStatus, responseError } from "../helpers/helpers.js";

export const authMiddleware = async (req, res, next) => {
    const parserRespond = parserJWTToken(req.headers.authorization);
    
    if (!parserRespond.success) return responseJsonByStatus(res, responseError(parserRespond.error));

    const user = await User.findById(parserRespond.userId);
    
    if (!user) {
        return responseJsonByStatus(res, responseError('Thông tin từ token không chính xác'))
    };

    req.authUser = user;    
    next();
}