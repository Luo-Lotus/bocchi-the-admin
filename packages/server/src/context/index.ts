import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import prisma from '../repositories';

export function createContext({ req, res }: CreateFastifyContextOptions) {
  return { req, res };
}
export type Context = inferAsyncReturnType<typeof createContext> & {
  traceId?: string;
  user?: inferAsyncReturnType<
    typeof prisma.user.findUnique<{
      where: {
        id: any;
      };
      include: {
        role: true;
      };
    }>
  >;
};
