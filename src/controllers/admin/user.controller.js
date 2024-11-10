import UserService from "../../services/user.service.js";

class UserController {
    async store(req, res) {
        try {
            const userService = new UserService();
            const newUser = await userService.store(req.body);

            return res.json(newUser)
        } catch (error) {
            return res.json(error.message)
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
    };

    async delete(req, res) {
        try {
            const userService = new UserService();
            return res.json(await userService.delete(req.params.userId));
        } catch (error) {
            res.json(error.message)
        }
    }
}

export default UserController;