import { z } from 'zod';
import { router } from '../initTRPC';
import authProcedure from '../procedures/auth';
import prisma from '../repositories';
import _, { omit } from 'lodash';
import {
  SortOrderSchema,
  AccountOptionalDefaultsSchema,
  AccountPartialSchema,
  AccountSchema,
} from '../constants/zodSchema';
import AuthTree from '@bta/common/AuthTree';
import { paramsToFilter } from '../utils/objectUtils';

const accountRouter = router({
  queryAccounts: authProcedure
    .meta({
      permission: AuthTree.accountModule.code,
    })
    .input(
      z.object({
        sort: z.record(AccountSchema.keyof(), SortOrderSchema).optional(),
        filter: AccountPartialSchema.optional(),
        page: z.object({
          current: z.number(),
          pageSize: z.number(),
        }),
      }),
    )
    .query(async ({ input: { sort, filter, page } }) => {
      const filterParams = paramsToFilter(filter || {});

      const result = await prisma.$transaction([
        prisma.account.findManyWithoutDelete({
          skip: (page.current - 1) * page.pageSize,
          take: page.pageSize,
          orderBy: sort,
          where: filterParams,
        }),

        prisma.account.count({
          where: filterParams,
        }),
      ]);
      return {
        data: result[0].map((item) => omit(item, 'password')),
        count: result[1],
      };
    }),

  updateAccount: authProcedure
    .meta({
      permission: AuthTree.accountModule.update.code,
    })
    .input(AccountPartialSchema.required({ id: true }))
    .mutation(async ({ input: account }) => {
      await prisma.account.updateWithVersion({
        where: {
          id: account.id,
        },
        data: account,
      });
    }),

  createAccount: authProcedure
    .meta({
      permission: AuthTree.accountModule.create.code,
    })
    .input(AccountOptionalDefaultsSchema)
    .mutation(async ({ input }) => {
      await prisma.account.create({
        data: input,
      });
    }),

  deleteAccount: authProcedure
    .meta({
      permission: AuthTree.accountModule.delete.code,
    })
    .input(AccountPartialSchema.required({ id: true, version: true }))
    .mutation(async ({ input }) => {
      await prisma.account.softDelete(input);
    }),

  changePassword: authProcedure
    .meta({
      permission: AuthTree.accountModule.changePassword.code,
    })
    .input(
      AccountSchema.pick({
        password: true,
        id: true,
        version: true,
      }),
    )
    .mutation(({ input }) => {
      prisma.account.updateWithVersion({
        where: {
          id: input.id,
        },
        data: {
          password: input.password,
          version: input.version,
        },
      });
    }),
});

export default accountRouter;
