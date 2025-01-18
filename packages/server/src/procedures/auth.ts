import { procedure } from '../initTRPC';
import authMiddleWare from '../middlewares/auth';
import loggerMiddleware from '../middlewares/logger';
import permissionMiddleWare from '../middlewares/permission';

const authProcedure = procedure
  .use(loggerMiddleware)
  .use(authMiddleWare)
  .use(permissionMiddleWare);

export default authProcedure;
