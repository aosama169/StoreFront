import express, { Request, Response } from 'express';
import { Orders, OrdersClass } from '../models/orders';
import cors from 'cors';
import auth from '../utilities/auth';

const order = new OrdersClass();

const indexed = async (req: Request, res: Response) => {
  let _orders : Orders[];
  try {
    _orders = await order.index();
  } catch (error) {
    res.status(501).json({ "Error Message":(error as Error).message });
    return;
  }
  res.json(_orders);
};

const showed = async (req: Request, res: Response) => {
  let _orders : Orders;
  try {
    _orders = await order.show(parseInt(req.params.id));
    } catch (error) {
    res.status(501).json({ "Error Message":(error as Error).message });
    return;
  }
  res.json(_orders);
};

const created = async (req: Request, res: Response) => {
  let _orders : Orders;
  try {
    _orders = await order.create(req.body);
    } catch (error) {
    res.status(501).json({ "Error Message":(error as Error).message });
    return;
  }
  res.json(_orders);
};

const updated = async (req: Request, res: Response) => {
  let _orders : Orders;
  try {
    _orders = await order.update(parseInt(req.params.id), req.body);
    } catch (error) {
    res.status(501).json({ "Error Message":(error as Error).message });
    return;
  }
  res.json(_orders);
};

const deleted = async (req: Request, res: Response) => {
  let _orders : boolean ;
  try {
    _orders = await order.delete(parseInt(req.params.id));
    } catch (error) {
    res.status(501).json({ "Error Message":(error as Error).message });
    return;
  }
  
  if (_orders) {
    res.json('Order deleted successfully');
  } else {
    res.status(501).json('Could not delete the Order');
  }

};

const currentOrder = async (req: Request, res: Response) => {
  let _orders : Orders;
  try {
    _orders = await order.currentOrder(parseInt(req.params.userId));
    } catch (error) {
    res.status(501).json({ "Error Message":(error as Error).message });
    return;
  }
  res.json(_orders);
};

const completedOrders = async (req: Request, res: Response) => {
  let _orders : Orders[];
  try {
    _orders = await order.completedOrders(parseInt(req.params.userId));
    } catch (error) {
    res.status(501).json({ "Error Message":(error as Error).message });
    return;
  }
  res.json(_orders);
};

const orderStatus = async (req: Request, res: Response) => {
  let _orders : string;
  try {
    _orders = await order.orderStatus(parseInt(req.params.orderId));
    } catch (error) {
    res.status(501).json({ "Error Message":(error as Error).message });
    return;
  }
  res.json({"Order Status": _orders});
};


const ordersRoutes = (app: express.Application) => {
  app.get('/orders', cors(), indexed);
  app.get('/orders/:id', cors(), showed);
  app.put('/orders/:id', cors(), auth, updated);
  app.post('/orders', cors(), auth, created);
  app.delete('/orders/:id', cors(), auth, deleted);
  app.get('/currentOrder/:userId', cors(), currentOrder);
  app.get('/completedOrders/:userId', cors(), completedOrders);
  app.get('/orderStatus/:orderId', cors(), orderStatus);
};

export default ordersRoutes;
