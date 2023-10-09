import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import prisma from '../repository';

export function createContext({ req, res }: CreateFastifyContextOptions) {
  return { req, res };
}
export type Context = inferAsyncReturnType<typeof createContext> & {
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
