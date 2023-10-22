import { procedure } from '../initTRPC';
import authMiddleWare from '../middlewares/auth';
import permissionMiddleWare from '../middlewares/permission';
import publicProcedure from './public';

const authProcedure = procedure
  .unstable_concat(publicProcedure)
  .use(authMiddleWare)
  .use(permissionMiddleWare);

export default authProcedure;
