import { middleware } from '@server/initTRPC';
import prisma from '@server/repository';
import JWTUtil from '../utils/JWTUtil';
import { throwTRPCUnauthorized } from '../utils/ErrorUtil';

const authMiddleWare = middleware(async (opt) => {
  const token = opt.ctx.req.headers.authorization as string;

  try {
    const { id } = await JWTUtil.verify(token);
    opt.ctx.user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        role: true,
      },
    });
  } catch (err: any) {
    throwTRPCUnauthorized(err.message);
  }

  return opt.next();
});

export default authMiddleWare;
