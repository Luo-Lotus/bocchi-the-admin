import { observable } from '@trpc/server/observable';
import { router } from '@server/initTRPC';
import zod from 'zod';
import publicProcedure from '@server/procedure/public';

const nestedRouter = router({
  nestedTest: publicProcedure.query(() => {
    return '嵌套路由测试';
  }),
});

const testRouter = router({
  getTestInfo: publicProcedure.input(zod.string()).query(({ input }) => {
    return `哈哈${input}`;
  }),
  getMessages: publicProcedure.query(() => {
    return ['这是第一条信息', '这是第二条信息'];
  }),
  nestedRouter,
  webSocketTest: publicProcedure.subscription(() => {
    let time = 0;
    return observable((emit) => {
      const timer = setInterval(() => {
        emit.next(time++);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    });
  }),
});

export default testRouter;
