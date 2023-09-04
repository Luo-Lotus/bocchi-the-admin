import { initTRPC } from '@trpc/server';
import { Context } from './context';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { formatErrorMessage } from './utils/zodUtil';

type Meta = {
  permission?: number;
};

const trpc = initTRPC
  .context<Context>()
  .meta<Meta>()
  .create({
    transformer: superjson,
    errorFormatter: ({ error, shape }) => {
      const isZodError = error.cause instanceof ZodError;
      return {
        ...shape,
        message: isZodError ? formatErrorMessage(error.message) : error.message,
        data: {
          ...shape.data,
          zodError: isZodError && error.cause.flatten(),
        },
      };
    },
  });

export const procedure = trpc.procedure;
export const middleware = trpc.middleware;
export const router = trpc.router;
export const mergeRouters = trpc.mergeRouters;
