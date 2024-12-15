import { USER } from "../config/constant.js";
import { parserJWTToken } from "../helpers/helpers.js";
import { User } from "../models/user.model.js";

export const adminOnlyMiddeware = async (req, res, next) => {
    const data = parserJWTToken(req.query.token);
    const user = await User.findById(data._id);        
    if (user.role == USER.role.admin) {
        next();
    } else res.json('Không có quyền truy cập')
};