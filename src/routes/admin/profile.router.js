import express from 'express';
import avatarMulter from '../../middleware/avatarMulter.middleware.js';
import ProfileController from '../../controllers/admin/profile.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';

const profileRouter = express.Router();
const profileController = new ProfileController();
profileRouter.use( authMiddleware );
profileRouter.put('/avatar', avatarMulter.single('avatar'), profileController.updateAvatar)
profileRouter.put('/', profileController.update)
profileRouter.get('/', profileController.show)

export default profileRouter;