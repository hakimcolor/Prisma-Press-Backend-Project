import { prisma } from '../../lib/prisma';
import { ILoginuser } from './auth.interface';
import bcrypt from 'bcrypt';
const loginUser = async (paylod: ILoginuser) => {
  const { email, password } = paylod;
  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('password is incorrect');
  }
  return user;
};
export const authService = {
  loginUser,
};
