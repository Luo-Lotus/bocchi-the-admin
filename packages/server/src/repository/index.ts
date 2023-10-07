import { Prisma, PrismaClient } from '@prisma/client';
import { throwTRPCBadRequestError } from '../utils/ErrorUtil';
const prisma = new PrismaClient({}).$extends({
  model: {
    $allModels: {
      /** 更新数据的同时校验版本与更新版本，请确保模型带有version字段*/
      async updateWithVersion<T>(this: T, args: Prisma.Args<T, 'updateMany'>) {
        const context = Prisma.getExtensionContext(this);
        const res = await (context as any).updateMany({
          ...args,
          where: {
            ...args.where,
            version: args.data.version,
          },
          data: {
            ...args.data,
            version: args.data.version + 1,
          },
        });
        if (!res.count) {
          throwTRPCBadRequestError('数据已删除或已更新，请刷新页面后重试');
        }
        return res;
      },
    },
  },
});

export default prisma;
