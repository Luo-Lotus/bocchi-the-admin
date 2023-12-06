import { z } from 'zod';
import { router } from '../initTRPC';
import authProcedure from '../procedures/auth';
import prisma from '../repositories';
import _ from 'lodash';
import {
  RoleOptionalDefaultsSchema,
  RolePartialSchema,
  RoleSchema,
  SortOrderSchema,
  RoleOriginSchema,
} from '../constants/zodSchema';
import AuthTree from '@bta/common/AuthTree';
import { paramsToFilter } from '../utils/objectUtils';
import { createQueryRouterInputSchema } from '../utils/zodUtil';

const roleRouter = router({
  queryRoles: authProcedure
    .meta({
      permission: AuthTree.roleModule.code,
    })
    .input(createQueryRouterInputSchema(RoleOriginSchema.partial()))
    .query(async ({ input: { sort, filter, page } }) => {
      const filterParams = paramsToFilter(filter || {});

      const result = await prisma.$transaction([
        prisma.role.findMany({
          skip: (page.current - 1) * page.pageSize,
          take: page.pageSize,
          orderBy: sort,
          where: filterParams,
        }),

        prisma.role.count({
          where: filterParams,
        }),
      ]);
      return {
        data: result[0],
        count: result[1],
      };
    }),

  updateRole: authProcedure
    .meta({
      permission: AuthTree.roleModule.update.code,
    })
    .input(RolePartialSchema.required({ id: true }))
    .mutation(async ({ input: role }) => {
      await prisma.role.updateWithVersion({
        where: {
          id: role.id,
        },
        data: role,
      });
    }),

  createRole: authProcedure
    .meta({
      permission: AuthTree.roleModule.create.code,
    })
    .input(RoleOptionalDefaultsSchema)
    .mutation(async ({ input }) => {
      await prisma.role.create({
        data: input,
      });
    }),

  deleteRole: authProcedure
    .meta({
      permission: AuthTree.roleModule.delete.code,
    })
    .input(z.number())
    .mutation(async ({ input }) => {
      await prisma.role.delete({
        where: {
          id: input,
        },
      });
    }),
});

export default roleRouter;
