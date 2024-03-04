import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { check, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/register",
  [
    check("firstName", "firstname is required").isString(),
    check("lastName", "lastname is required").isString(),
    check("email", "email is required").isEmail(),
    check("password", "password should be min of 6 characters").isLength({
      min: 6,
    }),
  ],
  async function (req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let user = await User.findOne({
        email: req.body.email,
      });
      if (user) {
        return res.status(400).json({ message: "user already exists" });
      }
      user = new User(req.body);
      await user.save();
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_KEY as string,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      return res.status(200).send({ message: "User Registered Succesfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "somthing went wrong" });
    }
  }
);

export default router;
