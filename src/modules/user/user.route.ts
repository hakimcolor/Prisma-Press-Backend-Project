import { Router } from 'express';
import { userController } from './user.controller';

const router = Router();
router.post('/register', userController.createUser);
router.get('/me', (req, res) => {
  
} ,userController.getMyprofile)
export const userRoute = router;
