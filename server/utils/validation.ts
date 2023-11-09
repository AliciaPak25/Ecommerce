import Joi from "joi";
import { IUser } from "../models/user";
import { Request, Response, NextFunction } from "express";

// When the user logs in
export const validateLoginData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loginSchema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .trim()
      .required()
      .messages({
        "string.min": "The username must have at least 3 alphabetic characters",
        "string.max": "The username must have at most 30 alphabetic characters",
      }),
    password: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .trim()
      .required()
      .messages({
        "string.min": "Password must be at least 3 characters long.",
      }),
  });

  const validation = loginSchema.validate(req.body, {
    abortEarly: false,
  });
  console.log(req.body);
  if (validation.error) {
    return res.json({
      success: false,
      from: "validator",
      message: validation.error.details,
      test: validation,
    });
  }

  next();
};

// When the user registers
export const validateUserData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userSchema = Joi.object<IUser>({
    username: Joi.string()
      .alphanum()
      .trim()
      .min(3)
      .max(30)
      .required()
      .messages({
        "string.min": "The username must have at least 3 alphabetic characters",
        "string.max": "The username must have at most 30 alphabetic characters",
      }),
    password: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .trim()
      .required()
      .messages({
        "string.min": "Password must be at least 3 characters long.",
      }),
  });

  const validation = userSchema.validate(req.body, {
    abortEarly: false,
  });
  console.log(req.body);
  if (validation.error) {
    return res.json({
      success: false,
      from: "validator",
      message: validation.error.details,
      test: validation,
    });
  }

  next();
};
