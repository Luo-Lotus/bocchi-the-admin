import { PrismaClient } from '@prisma/client';

import baseExtension from './extensions/baseExtension';

const prisma = new PrismaClient({}).$extends(baseExtension);

export default prisma;
