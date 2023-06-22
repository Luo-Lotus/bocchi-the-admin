import { mergeRouters } from '../initTRPC';
import testRouter from './test';

export const appRouter = mergeRouters(testRouter);

export type AppRouter = typeof appRouter;
