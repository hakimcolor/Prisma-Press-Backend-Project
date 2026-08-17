import httpsStatus  from 'http-status-codes';
import { NextFunction, Request, RequestHandler, Response } from "express";


 export const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusbar: httpsStatus.INTERNAL_SERVER_ERROR,
        message: (error as Error).message,
        data: null,
      });
    }
  };
};