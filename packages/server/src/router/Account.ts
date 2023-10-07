import { z } from 'zod';
import { router } from '../initTRPC';
import authProcedure from '../procedure/auth';
import prisma from '../repository';
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
        prisma.account.findMany({
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
    .input(z.number())
    .mutation(async ({ input }) => {
      await prisma.account.delete({
        where: {
          id: input,
        },
      });
    }),
});

export default accountRouter;
