import UserService from "../../services/user.service.js"

class ProfileController {
    static userService = new UserService();

    async show(req, res) {
        res.json('test')
    }

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