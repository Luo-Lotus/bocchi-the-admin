import { middleware } from '@server/initTRPC';
import { throwTRPCBadRequestError } from '../utils/ErrorUtil';

const permissionMiddleWare = middleware(({ meta, ctx, next }) => {
  const permissionId = meta?.permission;
  if (permissionId && !ctx.user.rule.rulePermission.includes(permissionId)) {
    throwTRPCBadRequestError('无api权限');
  }
  return next();
});

export default permissionMiddleWare;
