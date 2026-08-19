import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import config from './config';
import httpsStatus from 'http-status-codes';
import { prisma } from './lib/prisma';
import bcrypt from 'bcrypt';
import { userRoute } from './modules/user/user.route';
import { authRouter } from './modules/auth/auth.routes';

const app: Application = express();
//medilware
app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send('your server is runing good and well ');
});
// for register user
app.use('/api/users/register', userRoute);
// login user
app.use('/api/auth/login',authRouter)
// app.post('/api/users/register', async (req: Request, res: Response) => {
//   const { name, email, password, profilePhoto } = req.body;
//   const isUserExist = await prisma.user.findUnique({ where: { email } });
//   if (isUserExist) {
//     throw new Error('User already exists');
//   }
//   const hashedPassword = await bcrypt.hash(
//     password,
//     Number(config.bcrypt_salt_rounds)
//   );
//   const Createdusers = await prisma.user.create({
//     data: { name, email, password: hashedPassword },
//   });
//   await prisma.profile.create({
//     data: {
//       userId: Createdusers.id,
//       profilePhoto,
//     },
//   });

//   const user = await prisma.user.findUnique({
//     where: {
//       id: Createdusers.id,
//       email: Createdusers.email || email,
//     },
//     // password is omitted from the response for security reasons, and profile information is included
//     omit: { password: true },
//     // profile information is included in the response
//     include: { profile: true },
//   });

//   res.status(httpsStatus.CREATED).json({
//     success: true,
//     statusbar: httpsStatus.CREATED,
//     message: 'user created successfully',
//     data: { user },
//   });
// });
export default app;
