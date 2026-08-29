import { Request, Router, Response } from 'express';
import { userController } from './user.controller';

const router = Router();
router.post('/register', userController.createUser);
router.get('/me', (req :Request, res:Response) => {
  
} ,userController.getMyprofile)
export const userRoute = router;
