import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

const notFoundRoute = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
};

export default notFoundRoute;
