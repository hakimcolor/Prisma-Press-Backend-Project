import httpsStatus from 'http-status-codes';
import { Request, Router, Response, NextFunction } from 'express';
import { userController } from './user.controller';
import { jwtUtils } from '../../utils/jwt';
import config from '../../config';
import { Role } from '../../../generated/prisma/enums';
import { catchAsync } from '../../utils/catchAsync';
import { JwtPayload } from 'jsonwebtoken';

const router = Router();

declare global{
  namespace Express{
    interface Request {
      user?: {
        email:string;
        name:string;
        id:string;
        role:Role;
      };
    }
  }
}


router.post('/register', userController.createUser);



router.get(
  '/me',
  auth(Role.AUTHOR, Role.USER),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies);

    const { accessToken } = req.cookies;
    console.log(accessToken);
    

    
    const requiredRoles = [Role.AUTHOR, Role.USER];
  

    next();
  },
  userController.getMyprofile
);
export const userRoute = router;
