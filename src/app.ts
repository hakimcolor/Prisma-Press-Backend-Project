import express, { Application, Request, Response } from 'express';
import HttpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { prisma } from './lib/prisma';
import config from './config';

const app: Application = express();

// parse incoming JSON bodies
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Yes, server is running on port 3000');
});

app.post('/api/users/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'name, email and password are required' });
      return;
    }

    const isUserExist = await prisma.user.findUnique({ where: { email } });
    if (isUserExist) {
      res
        .status(HttpStatus.CONFLICT)
        .json({ message: 'User with this email already exists' });
      return;
    }

    const saltRounds = Number(config.bcrypt_salt_rounds) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        activeStatus: true,
        createdAt: true,
      },
    });

    res.status(HttpStatus.CREATED).json({
      message: 'User registered successfully',
      data: newUser,
    });
  } catch (error) {
    console.error('Register error:', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: 'Something went wrong' });
  }
});

export default app;
