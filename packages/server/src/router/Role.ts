import { z } from 'zod';
import { router } from '../initTRPC';
import authProcedure from '../procedure/auth';
import prisma from '../repository';
import _ from 'lodash';
import {
  RoleOptionalDefaultsSchema,
  RolePartialSchema,
  RoleSchema,
  SortOrderSchema,
} from '../constants/zodSchema';
import AuthTree from '../constants/AuthTree';

const roleRouter = router({
  queryRoles: authProcedure
    .meta({
      permission: AuthTree.roleModule.code,
    })
    .input(
      z.object({
        sort: z.record(RoleSchema.keyof(), SortOrderSchema).optional(),
        filter: RolePartialSchema.optional(),
        page: z.object({
          current: z.number(),
          pageSize: z.number(),
        }),
      }),
    )
    .query(async ({ input: { sort, filter, page } }) => {
      const filterParams = {
        ...filter,
        roleName: _.isEmpty(filter?.roleName)
          ? undefined
          : {
              contains: filter?.roleName,
            },
        permissions: _.isEmpty(filter?.permissions)
          ? undefined
          : {
              hasSome: filter?.permissions,
            },
      };

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
      await prisma.role.update({
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
