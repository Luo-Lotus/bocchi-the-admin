import prisma from '.';

export const getUser = () => {
  return prisma.user.findMany();
};
