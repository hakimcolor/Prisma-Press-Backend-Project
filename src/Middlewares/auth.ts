import  httpsStatus  from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from '../utils/jwt';
import config from '../config';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        name: string;
        id: string;
        role: Role;
      };
    }
  }
}

const auth = (...requiredRoles: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization?.startsWith('Bearer')
        ? req.headers.authorization?.split(' ')[1]
        : req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        success: false,
        statusCode: httpsStatus.UNAUTHORIZED,
        message: 'unauthorized access',
      });
    }
    const verifiedToken = jwtUtils.verifiedToken(
      token,
      config.jwt_access_token_secret
    );

    console.log(verifiedToken);
    if (!verifiedToken.success) {
      throw new Error(verifiedToken.message);
    }
    const { email, name, id, role } = verifiedToken.data as JwtPayload;

    if (!requiredRoles.includes(role)) {
      return res.status(403).json({
        success: false,
        statusCode: httpsStatus.FORBIDDEN,
        message: 'forbiden you dont have permiton ',
      });
    }
    req.user = {
      email,
      name,
      id,
      role,
    };
  });
};
  