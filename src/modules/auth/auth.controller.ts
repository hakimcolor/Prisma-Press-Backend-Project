import httpsStatus from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { authService } from './auth.service';
import { sendResponse } from '../../utils/sendResponse';

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const loginResult = await authService.loginUser(payload);
    sendResponse(res, {
      success: true,
      StatusCodes: httpsStatus.OK,
      Message: 'user logged in successfully',
      data: loginResult,
    });
  }
);

export const authController = {
  loginUser,
};
