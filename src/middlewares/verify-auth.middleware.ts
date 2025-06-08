import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    // @ts-ignore
    jwt.verify(token, process.env.PASS_PHRASE as string, async (err, payload) => {
      if (err) {
        res.status(403).json({ message: "Token is invalid!" });
        return;
      }

      res.locals.userId = payload.userId;
   
      next();
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default verifyAuth;
