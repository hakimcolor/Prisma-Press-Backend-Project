import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

;
const createToken = (payload: JwtPayload, secrect: string, expireIn: SignOptions) => {
  const token = jwt.sign(payload, secrect, expireIn);
  return token
  
}
export const jutUtils = {
  createToken
}