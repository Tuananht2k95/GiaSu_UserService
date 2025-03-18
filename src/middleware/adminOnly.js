import { USER } from "../config/constant.js";
import { parserJWTToken, responseError } from "../helpers/helpers.js";
import { User } from "../models/user.model.js";
import { responseJsonByStatus } from "../helpers/helpers.js";

export const adminOnlyMiddeware = async (req, res, next) => {
    const tokenParsed = parserJWTToken(req.query.token);
    const user = await User.findById(tokenParsed._id);   

    if (user.role == USER.role.admin) {
        next();
    } else responseJsonByStatus(res, responseError('You are not admin'), 403);
};