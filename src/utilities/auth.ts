import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const auth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  try {
    const token: string = req.body.token;
    jwt.verify(token, process.env.JWT_PASSWORD as string);
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token ' + err);
    return;
  }

  next();
};

export default auth;
