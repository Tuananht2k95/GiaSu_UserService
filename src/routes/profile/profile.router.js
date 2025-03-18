import express from 'express';
import avatarMulter from '../../middleware/avatarMulter.middleware.js';
import ProfileController from '../../controllers/profile/profile.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';

const profileRouter = express.Router();
const profileController = new ProfileController();

profileRouter.use( authMiddleware );
profileRouter.put(
    '/avatar', 
    avatarMulter.single('avatar'), 
    profileController.updateAvatar);
profileRouter.put('/', profileController.updatePassword);
profileRouter.get('/', profileController.show);
// profileRouter.post(
//     '/idCard', 
//     authMiddleware,
//     idCardMulter.fields([
//         {
//             name: 'frontCard',
//             maxcount: 1
//         },
//         {
//             name: 'backCard',
//             maxcount: 1
//         }
//     ]),     
//     profileController.storeIdCard
// );
// profileRouter.put(
//     '/idCard',
//     authMiddleware,
//     idCardMulter.fields([
//         {
//             name: 'frontCard',
//             maxcount: 1
//         },
//         {
//             name: 'backCard',
//             maxcount: 1
//         }
//     ]),     
//     profileController.updateIdCard
// )


export default profileRouter;