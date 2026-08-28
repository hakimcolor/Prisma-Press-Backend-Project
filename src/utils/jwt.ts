import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
//create token 
const createToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: SignOptions
) => {
  const token = jwt.sign(payload, secret, { expiresIn } as SignOptions);
  return token;
};
//verified token for loging user or profile 
const verifiedToken = (token: string, secret: string) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    return verifiedToken;
  } catch (error:any) {
    throw new Error(error.message);
  }
};

export const jwtUtils = {
  createToken,
  verifiedToken,
};
