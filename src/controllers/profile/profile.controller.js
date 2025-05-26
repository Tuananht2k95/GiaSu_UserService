import { responseError, responseJsonByStatus, responseSuccess, signHmac } from "../../helpers/helpers.js";
import UserService from "../../services/user.service.js"
import winston from "winston";

class ProfileController {
    static userService = new UserService();

    async updateAvatar(req, res) {
        try {
            winston.loggers.get('user').info('update avatar');

            if (!req.file) return responseJsonByStatus(res, responseError('file k ton tai'), 400);
            const newUser = await ProfileController.userService.updateAvatar(req.authUser._id, req.file.filename);
    
            return responseJsonByStatus(res, responseSuccess(newUser), 200);
        } catch (error) {
            responseJsonByStatus(res, responseError(error.message), 500);
        }
    }

    async show(req, res) {
        try {
            const userId = req.authUser._id;
            winston.loggers.get('user').info(`user ${userId} get detail`);

            return responseJsonByStatus(res, responseSuccess(await ProfileController.userService.find(userId)), 200);
        } catch (error) {
            responseJsonByStatus(res, responseError(error.message), 500);
        }
    };
   
    async updatePassword(req, res) {
        try {
            winston.loggers.get('user').info(`user ${req.authUser._id} update password`);

            const oldPassword = signHmac( req.body.oldPassword, 'sha256' );
            const newPassword = signHmac( req.body.newPassword, 'sha256' );
            
            return responseJsonByStatus( 
                res, 
                responseSuccess( 
                    await ProfileController.userService.updatePassword( req.authUser._id, oldPassword, newPassword )
                    , 200
                    , 'Thay đổi mật khẩu thành công' ))
        } catch (error) {
            return responseJsonByStatus( res, responseError(error) );
        }
    }

}

export default ProfileController;