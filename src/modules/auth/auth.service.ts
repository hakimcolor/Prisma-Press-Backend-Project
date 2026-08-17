import config from '../../config';
import { prisma } from '../../lib/prisma';
import { ILoginuser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
const loginUser = async (paylod: ILoginuser) => {
  const { email, password } = paylod;
  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('password is incorrect');
  }
  const jwtpayload = {
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtpayload, config.jwt_access_token_secret, {
    expiresIn: config.jwt_access_token_expiration,
  } as SignOptions);
  const refreshToken = jwt.sign(jwtpayload, config.jwt_refresh_token_secret, {
    expiresIn: config.jwt_refresh_token_expiration,
  } as SignOptions);
  return { accessToken, refreshToken };
};

export const authService = {
  loginUser,
};
