import express, { Request, Response } from 'express';
import { Product, ProductClass } from '../models/product';
import cors from 'cors';
import auth from '../utilities/auth';

const product = new ProductClass();

const indexed = async (req: Request, res: Response) => {
  let products: Product[];
  try {
    products = await product.index();
  } catch (error) {
    res.status(501).json({ "Error Message":(error as Error).message });
    return;
  }
  res.json(products);
};

const showed = async (req: Request, res: Response) => {
  let products: Product;
  try {
    products = await product.show(parseInt(req.params.id));
  } catch (error) {
    res.status(501).json({ "Error Message":(error as Error).message });
    return;
  }
  res.json(products);
};

const created = async (req: Request, res: Response) => {
  let products: Product;
  try {
    products = await product.create(req.body);
  } catch (error) {
    res.status(501).json({ "Error Message":(error as Error).message });
    return;
  }
  res.json(products);
};

const updated = async (req: Request, res: Response) => {
  let products: Product;
  try {
    products = await product.update(parseInt(req.params.id), req.body);
  } catch (error) {
    res.status(501).json({ "Error Message":(error as Error).message });
    return;
  }
  res.json(products);
};

const deleted = async (req: Request, res: Response) => {
  let products: boolean;
  try {
    products = await product.delete(parseInt(req.params.id));
  } catch (error) {
    res.status(501).json({ "Error Message":(error as Error).message });
    return;
  }

  if (products) {
    res.json('Product deleted successfully');
  } else {
    res.status(501).json('Could not delete the Product');
  }
};

const topFive = async (req: Request, res: Response) => {
  let products: Product[];
  try {
    products = await product.topFive();
  } catch (error) {
    res.status(501).json({ "Error Message":(error as Error).message });
    return;
  }
  res.json(products);
};
const showCat = async (req: Request, res: Response) => {
  let products: Product[];
  try {
    products = await product.showCat(req.params.category);
  } catch (error) {
    res.status(501).json({ "Error Message":(error as Error).message });
    return;
  }
  res.json(products);
};

const productRoutes = (app: express.Application) => {
  app.get('/products', cors(), indexed);
  app.get('/products/:id', cors(), showed);
  app.put('/products/:id', cors(), auth, updated);
  app.post('/products', cors(), auth, created);
  app.delete('/products/:id', cors(), auth, deleted);
  app.get('/topProducts', cors(), auth, topFive);
  app.get('/products/:category', cors(), auth, showCat);
};

export default productRoutes;
