import express, { Request, Response } from 'express';
import { Invoice, InvoiceClass } from '../models/invoice';
import cors from 'cors';
import auth from '../utilities/auth';

const invoice = new InvoiceClass();

const indexed = async (req: Request, res: Response) => {
    let invoices : Invoice[];
    try {
        invoices = await invoice.index();
    } catch (error) {
    res.status(501).json({ "Error Message":(error as Error).message });
    return;
  }

  res.json(invoices);
};

const showed = async (req: Request, res: Response) => {
    let invoices : Invoice;
    try {
        invoices = await invoice.show(parseInt(req.params.id));
      } catch (error) {
    res.status(501).json({ "Error Message":(error as Error).message });
    return;
  }
  res.json(invoices);
};

const created = async (req: Request, res: Response) => {
    let invoices : Invoice;
    try {
        invoices = await invoice.create(req.body);
    } catch (error) {
        res.status(501).json({ "Error Message":(error as Error).message });
        return;
    }
  res.json(invoices);
};

const updated = async (req: Request, res: Response) => {
    let invoices : Invoice;
    try {
        invoices = await invoice.update(parseInt(req.params.id), req.body);
      } catch (error) {
        res.status(501).json({ "Error Message":(error as Error).message });
        return;
    }
  res.json(invoices);
};

const deleted = async (req: Request, res: Response) => {
    let invoices : boolean;
    try {
        invoices = await invoice.delete(parseInt(req.params.id));
      } catch (error) {
        res.status(501).json({ "Error Message":(error as Error).message });
        return;
    }
  
    if (invoices) {
        res.json('Invoice deleted successfully');
      } else {
        res.status(501).json('Could not delete the invoice');
      }
    
};

const showOrderInvoice = async (req: Request, res: Response) => {
    let invoices : Invoice[];
    try {
        invoices = await invoice.showOrderInvoice(parseInt(req.params.userId));
      } catch (error) {
        res.status(501).json({ "Error Message":(error as Error).message });
        return;
    }
  res.json(invoices);
};

const invoicesRoutes = (app: express.Application) => {
  app.get('/invoices', cors(), indexed);
  app.get('/invoices/:id', cors(), showed);
  app.put('/invoices/:id', cors(), auth, updated);
  app.post('/invoices', cors(), auth, created);
  app.delete('/invoices/:id', cors(), auth, deleted);
  app.get('/showOrderInvoice/:orderID', cors(), auth, showOrderInvoice);
};

export default invoicesRoutes;
