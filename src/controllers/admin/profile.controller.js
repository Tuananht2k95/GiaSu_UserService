import { signHmac } from "../../helpers/helpers.js";
import UserService from "../../services/user.service.js"

class ProfileController {
    async updateAvatar(req, res) {
        try {
            const userService = new UserService();

            if (!req.file) return res.json('File khong ton tai');
            const newUser = await userService.updateAvatar(req.authUser._id, req.file.filename);
            res.json(newUser)
        } catch (error) {
            res.json(error.message)
        }
    }

    async show(req, res) {
        try {
            const userId = req.authUser._id;
            const userService = new UserService();

            return res.json(await userService.find(userId));
        } catch (error) {
            console.log(error.message);
        }
    }

    async update(req, res) {
        try {            
            const userId = req.authUser._id;
            const userService = new UserService();
            const newPassword = signHmac(req.body.password, 'sha256');

            return res.json(await userService.update(userId, {password: newPassword}));
        } catch (error) {
            console.log(error.message);
        }
    }
}

export default ProfileController;