import { signHmac } from "../helpers/helpers.js";
import { USER } from "../config/constant.js";
import { generateJWTToken, parserJWTToken } from "../helpers/helpers.js";
import moment from "moment";
import UserRepository from "../repository/user.repository.js";
import redis from "../../database/redis.js";
import HttpError from "../eceptions/httpError.eception.js";

class AuthService {
    static userRepository = new UserRepository();

    async login(email, password) {
        const user = await AuthService.userRepository.findOne({email: email});


        if ( !user ) throw new HttpError(
            {
                errors: [
                    {
                        key: 'email',
                        value: email,
                        message: 'Email chưa đăng ký',
                    }
                ] 
            }, 422
        )

        if ( user.status === USER.status.inactive ) 
            throw new HttpError(
                {
                    errors: [
                        {
                            key: 'email',
                            value: email,
                            message: 'Email này chưa được xác thực, kiểm tra lại email của bạn',
                        }
                    ]
                }
        )

        if (user.status === USER.status.blocked) 
            throw new HttpError(
                {
                    errors: [
                        {
                            key: 'email',
                            value: email,
                            message: 'Email này đã bị khoá bởi hệ thống',
                        }
                    ]
                }
        )

        if (user.password === signHmac(password, 'sha256')) 
            return generateJWTToken(user._id, 'sha256', moment().add(7,'days').unix());
        else throw new HttpError(
            {
                errors: [
                    {
                        key: 'password',
                        value: password,
                        message: 'Password không đúng',
                    }
                ]
            }
        )
    };

    async confirmAccount(token, confirmationCode) {
        const parsedToken = parserJWTToken(token);

        if (!parsedToken.success) throw parsedToken.error;
        const user = await AuthService.userRepository.findById(parsedToken.userId);

        if (user.status === USER.status.active) {
            throw new Error('user da xac thuc')
        };

        if (confirmationCode === await redis().get(`user:${user._id}:confirmationCode`)) {
            const data = {
                status: USER.status.active
            };
            
            return  await AuthService.userRepository.findByIdAndUpdate(user._id, data, user); 
        };

        throw new Error("code khong dung");
    };
};

export default AuthService;