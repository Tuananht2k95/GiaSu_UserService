import { responseError, responseJsonByStatus, responseSuccess, signHmac } from "../../helpers/helpers.js";
import UserService from "../../services/user.service.js"
import { ObjectId } from "mongodb";
import winston from "winston";

class ProfileController {
    async updateAvatar(req, res) {
        try {
            winston.loggers.get('user').info('update avatar');
            const userService = new UserService();
            if (!req.file) return responseJsonByStatus(res, responseError('file k ton tai'), 400);
            const newUser = await userService.updateAvatar(req.authUser._id, req.file.filename);
    
            return responseJsonByStatus(res, responseSuccess(newUser), 200);
        } catch (error) {
            responseJsonByStatus(res, responseError(error.message), 500);
        }
    }

    async show(req, res) {
        try {
            const userId = req.authUser._id;
            const userService = new UserService();

            return responseJsonByStatus(res, responseSuccess(await userService.find(userId)), 200);
        } catch (error) {
            responseJsonByStatus(res, responseError(error.message), 500);
        }
    };

    async update(req, res) {
        try {            
            const userId = req.authUser._id;
            const userService = new UserService();
            const newPassword = signHmac(req.body.password, 'sha256');

            return responseJsonByStatus(res, responseSuccess(await userService.update(userId, {password: newPassword})), 200);
        } catch (error) {
            responseJsonByStatus(res, responseError(error.message), 500);
        }
    };

    async confirmIdCard(req, res) {
        try {
            const userId = new ObjectId(req.body.userId);    
            const userService = new UserService();
            
            return responseJsonByStatus(res, responseSuccess(await userService.confirmIdCard(userId)), 200);
        } catch (error) {
            responseJsonByStatus(res, responseError(error.message), 500);
        }
    };

    async rejectIdCard(req, res) {
        try {
            const userId = new ObjectId(req.body.userId);    
            const userService = new UserService();
            const note = req.body.note;

            return responseJsonByStatus(res, responseSuccess(await userService.rejectIdCard(userId, note)), 200);
        } catch (error) {
            responseJsonByStatus(res, responseError(error.message), 500);
        }
    };
}

export default ProfileController;