import { User } from "../models/user.model.js";
import { signHmac } from "../helpers/helpers.js";
import { USER } from "../config/constant.js";
import { generateJWTToken } from "../helpers/helpers.js";
import moment from "moment";

class AuthService {
    async login(email, password) {
        const user = await User.findOne({email: email});       
        if ( user.status === USER.status.inactive ) 
            return 'user chua xac thuc'
        if (user.status === USER.status.blocked) 
            return 'user bi block'
        if (user.password === signHmac(password, 'sha256')) 
            return generateJWTToken(user._id, 'sha256', moment().add(7,'days').unix());
        else return 'password khong dung'
    };
};

export default AuthService;