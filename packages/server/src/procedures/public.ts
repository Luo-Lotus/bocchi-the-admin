import { procedure } from '../initTRPC';
import loggerMiddleware from '../middlewares/logger';

const publicProcedure = procedure.use(loggerMiddleware);

export default publicProcedure;
