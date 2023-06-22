import { router, procedure } from '../../initTRPC';
import zod from 'zod';

const testRouter = router({
  getTestInfo: procedure.input(zod.string()).query(({ input }) => {
    return `后端收到信息11${input}`;
  }),
});

export default testRouter;
