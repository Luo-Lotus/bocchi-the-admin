import { MenuDataItem } from '@ant-design/pro-components';
import AuthTree from '@monorepo/common/AuthTree';
import { defineConfig } from '@umijs/max';

const router = {
  path: '/',
  routes: [
    {
      name: '首页',
      path: 'home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: 'access',
      component: './Access',
    },
    {
      name: '权限设置',
      path: 'auth',
      component: './Auth',
      authCode: AuthTree.permissionModule.code,
    },
    {
      name: '角色管理',
      path: 'role',
      component: './Role',
    },
  ] as MenuDataItem[] &
    Exclude<ReturnType<typeof defineConfig>['routes'], false> & {
      authCode?: number;
    },
};

export default router;
