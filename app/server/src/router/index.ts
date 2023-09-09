import { mergeRouters, router } from '../initTRPC';
import userRouter from './User';
import testRouter from './test';
import PermissionRouter from './Permission';

export const appRouter = router({
  testRouter,
  userRouter,
  PermissionRouter,
});

export type AppRouter = typeof appRouter;
