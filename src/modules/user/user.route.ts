import httpsStatus from 'http-status-codes';
import { Request, Router, Response, NextFunction } from 'express';
import { userController } from './user.controller';
import { Role } from '../../../generated/prisma/enums';

import { auth } from '../../Middlewares/auth';

const router = Router();




router.post('/register', userController.createUser);



router.get(
  '/me',
  auth(Role.AUTHOR, Role.USER),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies);

    const { accessToken } = req.cookies;
    console.log(accessToken);
    

  

    next();
  },
  userController.getMyprofile
);
export const userRoute = router;
