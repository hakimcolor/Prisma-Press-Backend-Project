import express, { Application, Request, Response } from 'express';

const app: Application = express();
app.get('/', (req: Request, res: Response) => {
  res.send('your server is runing good and well ');
});
export default app;
