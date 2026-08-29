import { Request, Router, Response, NextFunction } from 'express';
import { userController } from './user.controller';
import { StatusCodes } from 'http-status-codes';

const router = Router();
router.post('/register', userController.createUser);
router.get('/me', (req :Request, res:Response , next:NextFunction) => {
  console.log(req.cookies)
  next()
} ,userController.getMyprofile)
export const userRoute = router;
