import { procedure } from '../initTRPC';
import authMiddleWare from '../middleware/auth';
import permissionMiddleWare from '../middleware/permission';
import publicProcedure from './public';

const authProcedure = procedure
  .unstable_concat(publicProcedure)
  .use(authMiddleWare)
  .use(permissionMiddleWare);

export default authProcedure;
