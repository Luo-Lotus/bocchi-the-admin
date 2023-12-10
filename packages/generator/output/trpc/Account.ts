import { z } from "zod";
import { router } from "../initTRPC";
import authProcedure from "../procedures/auth";
import prisma from "../repositories";
import _ from "lodash";
import {
  AccountOptionalDefaultsSchema,
  AccountPartialSchema,
  AccountOriginSchema,
} from "@server/constants/zodSchema";
import AuthTree from "@bta/common/AuthTree";
import { paramsToFilter } from "@server/utils/objectUtils";
import { createQueryRouterInputSchema } from "@server/utils/zodUtil";

const accountRouter = router({
  queryAccounts: authProcedure
    .meta({
      permission: AuthTree.accountModule.code,
    })
    .input(
      createQueryRouterInputSchema(
        AccountOriginSchema.partial().merge(
          z.object({
            createAt: DateRangeSchema,
            updateAt: DateRangeSchema,
            deleteAt: DateRangeSchema,
          }),
        ),
      ),
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
        data: result[0],
        count: result[1],
      };
    }),

  updateAccount: authProcedure
    .meta({
      permission: AuthTree.accountModule.update.code,
    })
    .input(AccountPartialSchema.required({ id: true }))
    .mutation(async ({ input: account }) => {
      await prisma.account.update({
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
