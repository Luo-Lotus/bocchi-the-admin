import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

prisma.$extends({
  query: {
    $allModels: {},
  },
});

export default prisma;
