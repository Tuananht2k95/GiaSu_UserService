import UserService from "../../services/user.service.js";
import { responseJsonByStatus, responseError, responseSuccess } from "../../helpers/helpers.js";

class UserController {
    static userService = new UserService();

    async store(req, res) {
        try {
            const newUser = await UserController.userService.store(req.body);

            return responseJsonByStatus( res, responseSuccess(newUser, 200, 'Regiter success'));
        } catch (error) {
            return responseJsonByStatus( res, responseError(error, 500, 'Register failed') );
        };
    };

    async update(req, res) {
        try {
            const userService = new UserService();
            const userUpdated = await userService.update(req.params.userId, req.body);

            return res.json(userUpdated);
        } catch (e) {
            return res.json(e.message);
        }
    };

    async find(req, res) {
        try {
            const userService = new UserService();
            const user = await userService.find(req.params.userId);

            return res.json(user)
        } catch (error) {
            res.json(error.message)
        }
    }

    async search(req, res) {
        try {
            const userService = new UserService();

            return res.json(await userService.search(req.query))
        } catch (error) {
            return res.json(error.message)
        }
    };
    
}

export default UserController;