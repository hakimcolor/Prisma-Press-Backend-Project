import httpsStatus from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { authService } from './auth.service';
import { sendResponse } from '../../utils/sendResponse';
import { ref } from 'node:process';

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const {accessToken,refreshToken} = await authService.loginUser(payload);
    
    // access cookis 
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      maxAge: 1000*60*60*24
})
// refresh cookies
res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  secure: false,
  sameSite: 'none',
  maxAge: 1000 * 60 * 60 * 7,
});

    sendResponse(res, {
      success: true,
      StatusCodes: httpsStatus.OK,
      Message: 'user logged in successfully',
      data: {
        accessToken, refreshToken
      }
    });
  }
);

export const authController = {
  loginUser,
};
