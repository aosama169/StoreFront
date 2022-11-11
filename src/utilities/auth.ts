import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const auth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  jwt.sign(
    {
      data: 'foobar'
    },
    'secret',
    { expiresIn: '1h' }
  );
};
