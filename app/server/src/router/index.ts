import { mergeRouters, router } from '../initTRPC';
import roleRouter from './Role';
import userRouter from './User';
import testRouter from './test';
import permissionRouter from './Permission';
export const appRouter = router({
  testRouter,
  userRouter,
  roleRouter,
  permissionRouter,
});

export type AppRouter = typeof appRouter;
