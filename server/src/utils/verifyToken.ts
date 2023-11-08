import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/* Middleware: it's a function that is gonna run before every request.
It's a way to do some checks before a request is executed.
*/
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction // ignores the rest and moves on with the request
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, process.env.SECRET_KEY, (error) => {
      if (error) {
        return res.sendStatus(403);
      }

      next();
    });
  } else {
    return res.sendStatus(401);
  }
};
