import { Request, Router, Response, NextFunction } from 'express';
import { userController } from './user.controller';
import { StatusCodes } from 'http-status-codes';

const router = Router();
router.post('/register', userController.createUser);
router.get('/me', (req :Request, res:Response , next:NextFunction) => {
  res.status(200).json({
    success: true,
    statucCode: 200,
    message:'your profile retrieved successfully '
  })
} ,userController.getMyprofile)
export const userRoute = router;
