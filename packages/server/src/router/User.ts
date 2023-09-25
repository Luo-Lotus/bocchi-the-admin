import publicProcedure from '@server/procedure/public';
import { router } from '@server/initTRPC';
import z from 'zod';
import prisma from '../repository';
import JWTUtil from '../utils/JWTUtil';
import _ from 'lodash';
import { exclude } from '../utils/objectUtils';
import { throwTRPCBadRequestError } from '../utils/ErrorUtil';
import authProcedure from '../procedure/auth';
import { UserPartialSchema } from '../constants/zodSchema';

const userRouter = router({
  signIn: publicProcedure
    .input(
      z.object({
        account: z.string().max(15),
        password: z
          .string()
          .regex(
            /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/,
            '密码必须包含数字与字母且大于6位小于15位',
          ),
      }),
    )
    .mutation(async ({ input }) => {
      console.log(input);

      const account = await prisma.account.findFirst({
        where: {
          password: input.password,
          OR: [
            {
              account: input.account,
            },
            {
              phoneNumber: input.account,
            },
            {
              email: input.account,
            },
          ],
        },
        include: {
          user: {
            include: {
              role: true,
            },
          },
        },
      });
      return account
        ? {
            user: account.user,
            authorization: JWTUtil.encode({ id: account.user.id }),
          }
        : throwTRPCBadRequestError('登陆失败，请检查用户名或密码是否正确');
    }),
  getUserInfoByToken: authProcedure.query(({ ctx }) => ctx.user),
  // createUser: authProcedure,
  // queryUsers: authProcedure,
  // updateUser: ,
  // deleteUser: ,
});

export default userRouter;
