import UserService from "../../services/user.service.js"
import { responseJsonByStatus, responseError, responseSuccess } from "../../helpers/helpers.js";
import winston from "winston";
class ProfileController {
    static userService = new UserService();

    async show(req, res) {
            try {
                const userId = req.authUser._id;
                winston.loggers.get('user').info(`user ${userId} get detail`);
    
                return responseJsonByStatus(res, responseSuccess(await ProfileController.userService.find(userId)), 200);
            } catch (error) {
                responseJsonByStatus(res, responseError(error.message), 500);
            }
        };

    async storeIdCard(req, res) {   
        const idCardData = {
            ...{ userId: req.authUser._id },
            ...req.body,
            ...{
                frontCard: req.files.frontCard[0].filename,
                backCard: req.files.backCard[0].filename,
            },
        };
        const userService = new UserService();
        res.json(await userService.storeIdCard(idCardData));
    };

    async updateIdCard(req, res) {
        const idCardData = {
            ...{ userId: req.authUser._id },
            ...req.body,
            ...{
                frontCard: req.files.frontCard[0].filename,
                backCard: req.files.backCard[0].filename,
            },
        };
        const userService = new UserService();
        res.json(await userService.updateIdCard(idCardData));
    }
}

export default ProfileController