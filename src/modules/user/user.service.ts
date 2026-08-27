import { Payload } from '../../../generated/prisma/internal/prismaNamespace';
import { prisma } from '../../lib/prisma';
import bcrypt from 'bcrypt';
import config from '../../config';

const createuserintoDB = async (payload: any) => {
  const { name, email, password, profilePhoto } = payload;

  const isUserExist = await prisma.user.findUnique({ where: { email } });
  if (isUserExist) {
    throw new Error('User already exists');
  }
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );
  const Createdusers = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
  await prisma.profile.create({
    data: {
      userId: Createdusers.id,
      profilePhoto,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: Createdusers.id,
      email: Createdusers.email || email,
    },
  //password omit .. dot send password on ui
    omit: { password: true },
    //show user with her profile 
    include: { profile: true },
  });
  return user;
};

const getMyprofileFromDB=async()=> {
  
}
export const userService = {
  createuserintoDB,
  getMyprofileFromDB
};
