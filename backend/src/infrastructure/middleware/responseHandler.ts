// src/infrastructure/middleware/responseHandler.ts
import { Request, Response, NextFunction } from "express";
import HttpResponse from "../http/HttpResponse";

export const responseHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.success = (
    data: any,
    statusCode: number = 200,
    message: string = "OK"
  ) => {
    const responseBody = new HttpResponse({
      statusCode: statusCode,
      message: message,
      data: data,
      isOk: true,
    });
    res.status(statusCode).json(responseBody);
  };

  next();
};