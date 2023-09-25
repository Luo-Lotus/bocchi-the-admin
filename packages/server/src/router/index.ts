import { mergeRouters, router } from '../initTRPC';
import roleRouter from './Role';
import userRouter from './User';
import permissionRouter from './Permission';
export const appRouter = router({
  userRouter,
  roleRouter,
  permissionRouter,
});

export type AppRouter = typeof appRouter;
