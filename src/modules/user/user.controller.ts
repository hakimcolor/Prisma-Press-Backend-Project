import httpsStatus from 'http-status-codes';

import { NextFunction, Request, RequestHandler, Response } from 'express';
import { userService } from './user.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import jwt from  "jsonwebtoken"
import config from '../../config';
import { log } from 'node:console';
import { jwtUtils } from '../../utils/jwt';

// const createUser = async (req: Request, res: Response) => {
//   try {
//     const payload = req.body;
//     const user = await userService.createuserintoDB(payload);
//     res.status(httpsStatus.CREATED).json({
//       success: true,
//       statusbar: httpsStatus.CREATED,
//       message: 'user created successfully',
//       data: { user },
//     });
//   } catch (error) {
//     res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       statusbar: httpsStatus.INTERNAL_SERVER_ERROR,
//       message: (error as Error).message,
//       data: null,
//     });
//   }
// };
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paylod = req.body;
    const user = await userService.createuserintoDB(paylod);
    // res.status(httpsStatus.CREATED).json({
    //   success: true,
    //   StatusCodes: httpsStatus.CREATED,
    //   Message: 'user registerd successfully ',
    //   data: { user },
    // });
    sendResponse(res, {
      success: true,
      StatusCodes: httpsStatus.CREATED,
      Message: 'user registerd successfully',
      data: { user },
    });
  }
);
const getMyprofile=catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    
    const {accessToken} = req.cookies;
    console.log(accessToken)
    const verifiedToken = jwtUtils.verifiedToken(accessToken,config.jwt_access_token_secret)
    console.log(verifiedToken)
    


    res.send('get my profile is ok ...')
  })


export const userController = { createUser, getMyprofile };
