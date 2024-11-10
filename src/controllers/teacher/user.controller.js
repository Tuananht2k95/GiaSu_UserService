import UserService from "../../services/userService.js";

class UserController {
    async store(req, res) {
        const userService = new UserService();
        const newUser = await userService.store(req.body);
        return res.json(newUser)
    };
}

export default UserController;