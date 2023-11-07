import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser, UserModel } from "../models/user";
import { UserErrors } from "../errors";

export const register = async (req: Request, res: Response) => {
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
};

export const login = async (req: Request, res: Response) => {
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
};

export const availableMoney = async (req: Request, res: Response) => {
  const { userID } = req.params;

  try {
    const user = await UserModel.findById(userID);
    if (!user) {
      res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }

    res.json({ availableMoney: user.availableMoney });
  } catch (error) {
    res.status(500).json({ error });
  }
};
