import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
import httpstats from 'http-status-codes';
import cors from 'cors';
import config from './config';
import { prisma } from './lib/prisma';
const app: Application = express();
app.use(
  cors({
    origin: config.api_url,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', async (req: Request, res: Response) => {
  const user = await prisma.user.findMany();
  console.log(user);
  res.send('hello world server is runing good .!');
});

//create a User
app.post('/api/users/register', async (req: Request, res: Response) => {
  const { name, email, password, profilePhoto } = req.body;
  // const isUserExist = await prisma.user.findMany({
  //   where: { email },
  });

  if (isUserExist) {
    throw new Error('user alrady ..acsist ok ');
  }

  console.log(name, email, password);
  res
    .status(httpstats.CREATED)
    .json({ message: 'user registered successfully...!' });
});

export default app;
