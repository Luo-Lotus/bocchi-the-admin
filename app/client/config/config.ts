import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {
    compact: true,
    configProvider: {},
    theme: {
      token: {
        colorPrimary: '#8219ff',
        colorInfo: '#8219ff',
        colorBgBase: '#fef0ff',
      },
    },
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  // layout: {
  //   title: '@umijs/max',
  // },
  routes: [
    {
      path: '/login',
      component: './Login',
    },
    {
      path: '/',
      component: '@/layouts/ProLayout/index',
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
      ],
    },
  ],
  npmClient: 'pnpm',
});
