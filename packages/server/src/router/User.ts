import publicProcedure from '@server/procedure/public';
import { router } from '@server/initTRPC';
import z from 'zod';
import prisma from '../repository';
import JWTUtil from '../utils/JWTUtil';
import _ from 'lodash';
import { exclude, paramsToFilter } from '../utils/objectUtils';
import { throwTRPCBadRequestError } from '../utils/ErrorUtil';
import authProcedure from '../procedure/auth';
import {
  SortOrderSchema,
  UserOptionalDefaults,
  UserOptionalDefaultsSchema,
  UserPartialSchema,
  UserSchema,
} from '../constants/zodSchema';
import AuthTree from '@bta/common/AuthTree';

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
            authorization: JWTUtil.encode({ id: account.user[0].id }),
          }
        : throwTRPCBadRequestError('登陆失败，请检查用户名或密码是否正确');
    }),
  getUserInfoByToken: authProcedure.query(({ ctx }) => ctx.user),
  queryUsers: authProcedure
    .meta({
      permission: AuthTree.userModule.code,
    })
    .input(
      z.object({
        sort: z.record(UserSchema.keyof(), SortOrderSchema).optional(),
        filter: UserPartialSchema.optional(),
        page: z.object({
          current: z.number(),
          pageSize: z.number(),
        }),
      }),
    )
    .query(async ({ input: { sort, filter, page } }) => {
      const filterParams = paramsToFilter(filter || {});

      const result = await prisma.$transaction([
        prisma.user.findMany({
          skip: (page.current - 1) * page.pageSize,
          take: page.pageSize,
          orderBy: sort,
          where: filterParams,
        }),

        prisma.user.count({
          where: filterParams,
        }),
      ]);
      return {
        data: result[0],
        count: result[1],
      };
    }),

  updateUser: authProcedure
    .meta({
      permission: AuthTree.userModule.update.code,
    })
    .input(UserPartialSchema.required({ id: true }))
    .mutation(async ({ input: user }) => {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: user,
      });
    }),

  createUser: authProcedure
    .meta({
      permission: AuthTree.userModule.create.code,
    })
    .input(UserOptionalDefaultsSchema)
    .mutation(async ({ input }) => {
      await prisma.user.create({
        data: input,
      });
    }),

  deleteUser: authProcedure
    .meta({
      permission: AuthTree.userModule.delete.code,
    })
    .input(z.number())
    .mutation(async ({ input }) => {
      await prisma.user.delete({
        where: {
          id: input,
        },
      });
    }),
});

export default userRouter;
