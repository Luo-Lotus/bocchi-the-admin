import { middleware } from '@server/initTRPC';
import { throwTRPCBadRequestError } from '../utils/ErrorUtil';
import AuthTree from '@bta/common/AuthTree';

const permissionMiddleWare = middleware(({ meta, ctx, next }) => {
  const permission = meta?.permission;
  const permissions = ctx?.user?.role.permissions || [];
  if (
    permission &&
    !(
      permissions.includes(permission as number) ||
      permissions.includes(AuthTree.code)
    )
  ) {
    throwTRPCBadRequestError('无api权限');
  }
  return next();
});

export default permissionMiddleWare;
