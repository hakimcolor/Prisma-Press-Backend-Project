import  httpsStatus  from 'http-status-codes';

import { Request, Response } from "express";
import { userService } from './user.service';

const createUser = async (req: Request, res: Response) => {

  try {

  const payload = req.body;
  const user = await userService.createuserintoDB(payload);
  res.status(httpsStatus.CREATED).json({
    success: true,
    statusbar: httpsStatus.CREATED,
    message: 'user created successfully',
    data: { user },
  });
  } catch (error) {
    res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusbar: httpsStatus.INTERNAL_SERVER_ERROR,
      message: (error as Error).message,
      data: null,
    });
  };
  
  
};
export const userController = {createUser}