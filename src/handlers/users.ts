import express, { Request, Response } from 'express';
import { UsersClass, Users } from '../models/users';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import auth from '../utilities/auth';

const users = new UsersClass();

/* ----------------
 *Removed Users Data From Routes .

const indexed = async (req: Request, res: Response) => {
  let _users : Users[] ;
  try{
    _users = await users.index();
  } catch (error) {
    res.status(501).json({ error });
    return;
  }
  res.json(_users);
};
*/
const showed = async (req: Request, res: Response) => {
  let _users: Users;
  try {
    _users = await users.show(parseInt(req.params.id));
  } catch (error) {
    res.status(501).json({ error });
    return;
  }
  res.json(_users);
};

const created = async (req: Request, res: Response) => {
  let token: string;
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

  let _users: Users;

  try {
    _users = await users.create(req.body);
  } catch (error) {
    res.status(501).json({ error });
    return;
  }

  _users.token = token;

  res.json(_users);
};

const updated = async (req: Request, res: Response) => {
  let _users: Users;
  try {
    _users = await users.update(parseInt(req.params.id), req.body);
  } catch (error) {
    res.status(501).json({ error });
    return;
  }
  res.json(_users);
};

const deleted = async (req: Request, res: Response) => {
  let _users: boolean;
  try {
    _users = await users.delete(parseInt(req.params.id));
  } catch (error) {
    res.status(501).json({ error });
    return;
  }

  if (_users) {
    res.json('User deleted successfully');
  } else {
    res.status(501).json('Could not delete the user');
  }
};

const authenticated = async (req: Request, res: Response) => {
  let _users: Users;
  try {
    _users = await users.Authenticate(req.params.email, req.params.password);
  } catch (error) {
    res.status(401).json({ error });
    return;
  }

  let token: string;
  try {
    token = jwt.sign(
      {
        data: _users
      },
      process.env.JWT_PASSWORD as string,
      { expiresIn: '1h' }
    );
  } catch (error) {
    res.status(401).json({ error });
    return;
  }

  _users.token = token;

  res.send(_users);
};

const usersRoutes = (app: express.Application) => {
  //app.get('/users', indexed);
  app.get('/users/:id', cors(), auth, showed);
  app.put('/users/:id', cors(), auth, updated);
  app.post('/users', cors(), auth, created);
  app.delete('/users/:id', cors(), auth, deleted);
  app.post('/auth', cors(), auth, authenticated);
};

export default usersRoutes;
