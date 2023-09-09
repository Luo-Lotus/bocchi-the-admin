import { MenuDataItem } from '@ant-design/pro-components';
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
      name: ' CRUD 示例',
      path: 'table',
      component: './Table',
    },
    {
      name: '权限设置',
      path: 'auth',
      component: './Auth',
    },
  ] as MenuDataItem[] &
    Exclude<ReturnType<typeof defineConfig>['routes'], false>,
};

export default router;
