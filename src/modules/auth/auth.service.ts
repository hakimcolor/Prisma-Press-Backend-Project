import config from '../../config';
import { prisma } from '../../lib/prisma';
import { jwtUtils } from '../../utils/jwt';
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
  // const accessToken = jwt.sign(jwtpayload, config.jwt_access_token_secret, {
  //   expiresIn: config.jwt_access_token_expiration,
  // } as SignOptions);
  const accessToken = jwtUtils.createToken(
    jwtpayload,
    config.jwt_access_token_secret,
    config.jwt_access_token_expiration as SignOptions
  )
  
  
  // const refreshToken = jwt.sign(jwtpayload, config.jwt_refresh_token_secret, {
  //   expiresIn: config.jwt_refresh_token_expiration,
  // } as SignOptions);
  const refreshToken = jwtUtils.createToken(
    jwtpayload,
    config.jwt_refresh_token_secret,
    config.jwt_refresh_token_expiration as SignOptions
  );






  return { accessToken, refreshToken, jwtpayload };
};

export const authService = {
  loginUser,
};
