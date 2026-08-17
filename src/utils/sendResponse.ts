import { Response } from 'express';

type TResponseData<T> = {
  success: boolean;
  StatusCodes: number;
  Message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
};
export const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
  res.status(data.StatusCodes).json({
    success: data.success,
    StatusCodes: data.StatusCodes,
    message: data.Message,
    data: data.data,
    meta: data.meta,
  });
};
