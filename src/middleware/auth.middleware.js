import { parserJWTToken } from "../helpers/helpers.js";
import { User } from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
    const parserRespond = parserJWTToken(req.headers.authorization);
    
    if (!parserRespond.success) return res.json(parserRespond.error);
    const user = await User.findById(parserRespond.userId);
    
    if (!user) {
        return res.json("user k ton tai")
    };
    req.authUser = user;    
    
    next();
}