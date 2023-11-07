import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser, UserModel } from "../models/user";
import { UserErrors } from "../errors";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (user) {
      return res.status(400).json({ type: UserErrors.USERNAME_ALREADY_EXISTS });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ type: error });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user: IUser = await UserModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    ); /* compare both the password sent and the password in the database to see if the hashed passwords match */
    if (!isPasswordValid) {
      return res.status(400).json({ type: UserErrors.WRONG_CREDENTIALS });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY
    ); /*   creates an encrypted version of the object (id: unique identifier for the user). This encrypted version would be the token. It's unique and encrypted for each user.*/
    res.json({ token, userID: user._id });
  } catch (error) {
    res.status(500).json({ type: error });
  }
});
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

export { router as userRouter };
