import { procedure } from '../initTRPC';
import loggerMiddleware from '../middleware/logger';

const publicProcedure = procedure.use(loggerMiddleware);

export default publicProcedure;
