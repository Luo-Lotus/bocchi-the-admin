import { DMMF } from '@prisma/generator-helper';

export const generateTRPCTemplate = (model: DMMF.Model) => {
  const modelName = model.name;
  const modelLowerCaseName = modelName.toLowerCase();

  const template = `
  import { z } from 'zod';
  import { router } from '../initTRPC';
  import authProcedure from '../procedures/auth';
  import prisma from '../repositories';
  import _ from 'lodash';
  import {
    ${modelName}OptionalDefaultsSchema,
    ${modelName}PartialSchema,
    ${modelName}OriginSchema,
  } from '@server/constants/zodSchema';
  import AuthTree from '@bta/common/AuthTree';
  import { paramsToFilter } from '@server/utils/objectUtils';
  import { createQueryRouterInputSchema } from '@server/utils/zodUtil';
  
  const ${modelLowerCaseName}Router = router({
    query${modelName}s: authProcedure
      .meta({
        permission: AuthTree.${modelLowerCaseName}Module.code,
      })
      .input(createQueryRouterInputSchema(${modelName}OriginSchema.partial()))
      .query(async ({ input: { sort, filter, page } }) => {
        const filterParams = paramsToFilter(filter || {});
  
        const result = await prisma.$transaction([
          prisma.${modelLowerCaseName}.findMany({
            skip: (page.current - 1) * page.pageSize,
            take: page.pageSize,
            orderBy: sort,
            where: filterParams,
          }),
  
          prisma.${modelLowerCaseName}.count({
            where: filterParams,
          }),
        ]);
        return {
          data: result[0],
          count: result[1],
        };
      }),
  
    update${modelName}: authProcedure
      .meta({
        permission: AuthTree.${modelLowerCaseName}Module.update.code,
      })
      .input(${modelName}PartialSchema.required({ id: true }))
      .mutation(async ({ input: ${modelLowerCaseName} }) => {
        await prisma.${modelLowerCaseName}.update({
          where: {
            id: ${modelLowerCaseName}.id,
          },
          data: ${modelLowerCaseName},
        });
      }),
  
    create${modelName}: authProcedure
      .meta({
        permission: AuthTree.${modelLowerCaseName}Module.create.code,
      })
      .input(${modelName}OptionalDefaultsSchema)
      .mutation(async ({ input }) => {
        await prisma.${modelLowerCaseName}.create({
          data: input,
        });
      }),
  
    delete${modelName}: authProcedure
      .meta({
        permission: AuthTree.${modelLowerCaseName}Module.delete.code,
      })
      .input(z.number())
      .mutation(async ({ input }) => {
        await prisma.${modelLowerCaseName}.delete({
          where: {
            id: input,
          },
        });
      }),
  });
  
  export default ${modelLowerCaseName}Router;
  
  `;
  return {
    modelName: modelName,
    fileName: `${modelName}.ts`,
    template,
  };
};
