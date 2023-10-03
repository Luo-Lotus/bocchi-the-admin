import { mergeRouters, router } from '../initTRPC';
import roleRouter from './Role';
import userRouter from './User';
import permissionRouter from './Permission';
import accountRouter from './Account';
export const appRouter = router({
  userRouter,
  roleRouter,
  permissionRouter,
  accountRouter,
});

export type AppRouter = typeof appRouter;
