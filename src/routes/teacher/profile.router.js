import express from "express";
import ProfileController from "../../controllers/teacher/profile.controller.js";
import idCardMulter from "../../middleware/idCardMulter.middleware.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const profileRouter = express.Router();
const profileController = new ProfileController();

profileRouter.use( authMiddleware );
profileRouter.get('/', profileController.show);
profileRouter.post(
    '/idCard', 
    authMiddleware,
    idCardMulter.fields([
        {
            name: 'frontCard',
            maxcount: 1
        },
        {
            name: 'backCard',
            maxcount: 1
        }
    ]),     
    profileController.storeIdCard
);
profileRouter.put(
    '/idCard',
    authMiddleware,
    idCardMulter.fields([
        {
            name: 'frontCard',
            maxcount: 1
        },
        {
            name: 'backCard',
            maxcount: 1
        }
    ]),     
    profileController.updateIdCard
)


export default profileRouter;
