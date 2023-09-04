import { mergeRouters, router } from '../initTRPC';
import userRouter from './User';
import testRouter from './test';

export const appRouter = router({
  testRouter,
  userRouter,
});

export type AppRouter = typeof appRouter;
