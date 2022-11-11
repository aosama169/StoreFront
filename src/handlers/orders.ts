import express, { Request, Response } from 'express';
import { OrdersClass } from '../models/orders';

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

const ordersRoutes = (app: express.Application) => {
  app.get('/orders', indexed);
  app.get('/orders/:id', showed);
  app.put('/orders/:id', updated);
  app.post('/orders', created);
  app.delete('/orders/:id', deleted);
};

export default ordersRoutes;
