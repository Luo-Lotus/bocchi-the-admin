import { z } from "zod";
import { router } from "../initTRPC";
import authProcedure from "../procedures/auth";
import prisma from "../repositories";
import _ from "lodash";
import {
  UserOptionalDefaultsSchema,
  UserPartialSchema,
  UserOriginSchema,
} from "@server/constants/zodSchema";
import AuthTree from "@bta/common/AuthTree";
import { paramsToFilter } from "@server/utils/objectUtils";
import { createQueryRouterInputSchema } from "@server/utils/zodUtil";

const userRouter = router({
  queryUsers: authProcedure
    .meta({
      permission: AuthTree.userModule.code,
    })
    .input(
      createQueryRouterInputSchema(
        UserOriginSchema.partial().merge(
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
