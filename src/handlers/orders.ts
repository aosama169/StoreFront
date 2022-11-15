import express, { Request, Response } from 'express';
import { OrdersClass } from '../models/orders';
import cors from 'cors';
import auth from '../utilities/auth';

const order = new OrdersClass();

const indexed = async (req: Request, res: Response) => {
  const orders = await order.index();

  res.json(orders);
};

const showed = async (req: Request, res: Response) => {
  const orders = await order.show(parseInt(req.params.id));
  res.json(orders);
};

const created = async (req: Request, res: Response) => {
  const orders = await order.create(req.body);
  res.json(orders);
};

const updated = async (req: Request, res: Response) => {
  const orders = await order.update(parseInt(req.params.id), req.body);
  res.json(orders);
};

const deleted = async (req: Request, res: Response) => {
  const orders = await order.delete(parseInt(req.params.id));
  res.json(orders);
};

const currentOrder = async (req: Request, res: Response) => {
  const orders = await order.currentOrder(parseInt(req.params.userId));
  res.json(orders);
};

const completedOrders = async (req: Request, res: Response) => {
  const orders = await order.completedOrders(parseInt(req.params.userId));
  res.json(orders);
};

const ordersRoutes = (app: express.Application) => {
  app.get('/orders', cors(), indexed);
  app.get('/orders/:id', cors(), showed);
  app.put('/orders/:id', cors(), auth, updated);
  app.post('/orders', cors(), auth, created);
  app.delete('/orders/:id', cors(), auth, deleted);
  app.get('/currentOrder/:userId', cors(), currentOrder);
  app.get('/completedOrders/:userId', cors(), completedOrders);
};

export default ordersRoutes;
