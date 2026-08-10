import { Payload } from './../generated/prisma/internal/prismaNamespace';
import express, { Application, Request, Response } from 'express';
import HttpStatus  from 'http-status';

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Yes, server is running on port 3000');
});


app.post('/api/uses/register', async(req:Request, res:Response) => {
  // Implementation for user registration
  const Payload = req.body 
  res.status(HttpStatus.CREATED).json({ message: 'User registered successfully', data: Payload });

});

export default app;
