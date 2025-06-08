import { Request, Response } from "express";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model";
import cookieOptions from "../config/cookie-options";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const userDetails = res.locals.validatedBody;

    const user = await User.findOne({ email: userDetails.email }).lean().exec();

    if (user) {
      res.status(409).json({ message: "Email is already exist!" });
      return;
    }

    const hashed_password = await bcrypt.hash(userDetails.password, 11);

    const { password, ...userWithoutPassword } = userDetails;

    const { _id } = await User.create({ ...userWithoutPassword, hashed_password });

    const token = jwt.sign({ userId: _id }, process.env.PASS_PHRASE as string);

    res.cookie("token", token, cookieOptions);

    res.status(201).json({ message: "Succesfully Registered!" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = res.locals.validatedBody;

    const user = await User.findOne({ email }).lean().exec();

    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.hashed_password as string);

    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.PASS_PHRASE as string);

    res.cookie("token", token, cookieOptions);

    res.status(200).json({ message: "Successfuly login!" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
