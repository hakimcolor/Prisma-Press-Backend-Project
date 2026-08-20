import httpsStatus from 'http-status-codes';

import { NextFunction, Request, RequestHandler, Response } from 'express';
import { userService } from './user.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';

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
    const profile = await userService.createuserintoDB(paylod);
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
      data: { profile },
    });
  }
);
export const userController = { createUser };
