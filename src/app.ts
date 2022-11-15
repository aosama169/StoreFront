import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './handlers/users';
import productRoutes from './handlers/product';
import ordersRoutes from './handlers/orders';
import cors from 'cors';

const app: express.Application = express();

app.use(bodyParser.json());

//use Routers From Handlers..
usersRoutes(app);
productRoutes(app);
ordersRoutes(app);

//Main EndPoint.
app.get('*', cors(), (req: Request, res: Response): void => {
  res.send(
    '<h1>Welcome</h1><br><h3>You Can Find My EndPoint Following This URL: <br>http://localhost:3030/ </h3>' +
      '<br><br>' +
      '<strong>Discover the Available Products From <a href="http://localhost:3030/products">Here</a></strong>' +
      '<br><br>'
  );
});

export default app;
