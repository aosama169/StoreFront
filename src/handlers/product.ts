import express, { Request, Response } from 'express';
import { ProductClass } from '../models/product';

const product = new ProductClass();

const indexed = async (req: Request, res: Response) => {
  const products = await product.index();
  res.json(products);
};

const showed = async (req: Request, res: Response) => {
  const products = await product.show(parseInt(req.params.id));
  res.json(products);
};

const created = async (req: Request, res: Response) => {
  const products = await product.create(req.body);
  res.json(products);
};

const updated = async (req: Request, res: Response) => {
  const products = await product.update(parseInt(req.params.id), req.body);
  res.json(products);
};

const deleted = async (req: Request, res: Response) => {
  const products = await product.delete(parseInt(req.params.id));
  res.json(products);
};

const productRoutes = (app: express.Application) => {
  app.get('/products', indexed);
  app.get('/products/:id', showed);
  app.put('/products/:id', updated);
  app.post('/products', created);
  app.delete('/products/:id', deleted);
};

export default productRoutes;
