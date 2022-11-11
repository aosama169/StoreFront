import express, { Request, Response } from 'express';
import { UsersClass, Users } from '../models/users';
import jwt from 'jsonwebtoken';

const users = new UsersClass();

const indexed = async (req: Request, res: Response) => {
  const _users = await users.index();
  res.json(_users);
};

const showed = async (req: Request, res: Response) => {
  const _users = await users.show(parseInt(req.params.id));
  res.json(_users);
};

const created = async (req: Request, res: Response) => {
  let token: string ;
  try {
    token = jwt.sign(
      {
        data: req.body
      },
      process.env.JWT_PASSWORD as string,
      { expiresIn: '1h' }
    );
  } catch (error) {
    res.status(401).json({ error });
    return;
  }

  const _users = await users.create(req.body);
  _users.token = token;
  
  res.json(_users);
};

const updated = async (req: Request, res: Response) => {
  const _users = await users.update(parseInt(req.params.id), req.body);
  res.json(_users);
};

const deleted = async (req: Request, res: Response) => {
  const _users = await users.delete(parseInt(req.params.id));
  res.json(_users);
};

const authenticated = async (req: Request, res: Response) => {
  const result = await users.Authenticate(
    req.params.email,
    req.params.password
  );
  res.send(result);
};

const usersRoutes = (app: express.Application) => {
  app.get('/users', indexed);
  app.get('/users/:id', showed);
  app.put('/users/:id', updated);
  app.post('/users', created);
  app.delete('/users/:id', deleted);
  app.post('/auth', authenticated);
};

export default usersRoutes;
