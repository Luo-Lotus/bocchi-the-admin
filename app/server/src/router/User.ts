import publicProcedure from '@server/procedure/public';
import { router } from '@server/initTRPC';
import z from 'zod';
import prisma from '../repository';
import { TRPCError } from '@trpc/server';
import JWTUtil from '../utils/JWTUtil';
import _ from 'lodash';
import { exclude } from '../utils/objectUtils';
import { throwTRPCBadRequestError } from '../utils/ErrorUtil';

const userRouter = router({
  signIn: publicProcedure
    .meta({
      permission: 1,
    })
    .input(
      z.object({
        username: z.string().max(15),
        password: z.string(),
        // .regex(/^[A-Za-z0-9]{15}$/, '密码必须包含数字与密码且小于等于15位'),
      })
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.findFirst({
        where: input,
      });
      if (user) {
        return {
          user: exclude(user, ['password']),
          authorization: JWTUtil.encode({ id: user.id }),
        };
      } else {
        throwTRPCBadRequestError('登陆失败，请检查用户名或密码是否正确1');
      }
    }),
});

export default userRouter;
