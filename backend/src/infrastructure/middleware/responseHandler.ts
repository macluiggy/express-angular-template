// src/infrastructure/middleware/responseHandler.ts
import { Request, Response, NextFunction } from 'express';

export const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  res.success = (data: any) => {
    res.status(200).json({
      statusCode: 200,
      data,
    });
  };

  res.error = (error: any) => {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      statusCode,
      message: error.message || 'Internal Server Error',
    });
  };

  next();
};
