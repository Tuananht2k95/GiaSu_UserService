import UserService from "../../services/user.service.js"

class ProfileController {
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
    }
}

export default ProfileController