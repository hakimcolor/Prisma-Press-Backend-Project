import { Router } from 'express';
import { userController } from './user.controller';

const router = Router();
router.post('/', userController.createUser);
router.get('/me', userController.getMyprofile)
export const userRoute = router;
