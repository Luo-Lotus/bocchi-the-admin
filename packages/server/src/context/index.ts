import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import prisma from '../repositories';

export function createContext({ req, res }: CreateFastifyContextOptions) {
  return { req, res };
}
export type Context = Awaited<ReturnType<typeof createContext>> & {
  traceId?: string;
  user?: Awaited<
    ReturnType<
      typeof prisma.user.findUnique<{
        where: {
          id: any;
        };
        include: {
          role: true;
        };
      }>
    >
  >;
};
