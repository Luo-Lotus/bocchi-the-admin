import { mergeRouters, router } from '../initTRPC';
import roleRouter from './Role';
import userRouter from './User';
import testRouter from './test';

export const appRouter = router({
  testRouter,
  userRouter,
  roleRouter,
});

export type AppRouter = typeof appRouter;
