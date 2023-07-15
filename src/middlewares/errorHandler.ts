import { Request, Response, NextFunction } from "express";

/**
 * Middleware error handler function for Express applications.
 * Handles errors by logging them and sending an appropriate error response.

 * @param err - The error object to be handled.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
const errorHandler = (
  err,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(`error ${err.message}`);

  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";

  res.status(statusCode).json({ errors: [{ message: errorMessage }] });
};

export default errorHandler;
