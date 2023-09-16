import { initTRPC } from '@trpc/server';
import { Context } from './context';
import superjson from 'superjson';
import { handlePrismaError, handleZodError } from './utils/ErrorUtil';

type Meta = {
  permission?: number;
};

const trpc = initTRPC
  .context<Context>()
  .meta<Meta>()
  .create({
    transformer: superjson,
    errorFormatter: ({ error, shape }) => {
      const prismaError = handlePrismaError(error);
      const zodError = handleZodError(error);
      return {
        ...shape,
        message:
          (zodError?.message as string) ||
          (prismaError?.message as string) ||
          error.message,
        data: {
          ...shape.data,
          zodError: zodError?.data.zodError,
        },
      };
    },
  });

export const procedure = trpc.procedure;
export const middleware = trpc.middleware;
export const router = trpc.router;
export const mergeRouters = trpc.mergeRouters;
