import HttpError from "../../eceptions/httpError.eception.js";
import { responseError, responseJsonByStatus, responseSuccess } from "../../helpers/helpers.js";
import AuthService from "../../services/auth.service.js";
import UserService from "../../services/user.service.js";
import winston from "winston";

class AuthController {
    static authService = new AuthService();
    static userService = new UserService();

    async login(req, res) {
        try {
            winston.loggers.get('user').info('user login')

            return responseJsonByStatus(res, responseSuccess(await AuthController.authService.login(req.body.email, req.body.password)), 200);
        } catch (error) {
            if (error instanceof HttpError)
                return responseJsonByStatus(res, responseError(error), 422)
            return responseJsonByStatus(res, responseError(error), 500);
        }
    };

    async register(req, res) {
        try {
            winston.loggers.get('user').info('user register')
            
            const newUser = req.body;
            return responseJsonByStatus(res, responseSuccess(await AuthController.userService.store(newUser)), 200)
        } catch (error) {   
            return responseJsonByStatus(res, responseError(error), 409)
        }
    }

    async confirmAccount(req, res) {
        try {         
            winston.loggers.get('user').info('user confirm')

            return responseJsonByStatus( res, responseSuccess( await AuthController.authService.confirmAccount( req.body.token, req.body.confirmationCode ), 200, "user xac thuc thanh cong" ) );
        } catch (error) {
            return responseJsonByStatus( res, responseError(error) );
        }
    }
};

export default AuthController;