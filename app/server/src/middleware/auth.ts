import { middleware } from '@server/initTRPC';
import prisma from '@server/repository';
import JWTUtil from '../utils/JWTUtil';
import { throwTRPCBadUnauthorized } from '../utils/ErrorUtil';

const authMiddleWare = middleware(async (opt) => {
  const token = opt.ctx.req.headers.authorization as string;

  try {
    const { id } = await JWTUtil.verify(token);
    opt.ctx.user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        rule: true,
      },
    });
  } catch (err: any) {
    throwTRPCBadUnauthorized(err.message);
  }

  return opt.next();
});

export default authMiddleWare;
