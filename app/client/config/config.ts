import { defineConfig } from '@umijs/max';
import router from '../src/router';

export default defineConfig({
  antd: {
    compact: true,
    configProvider: {},
    theme: {
      token: {
        colorPrimary: '#8219ff',
        colorInfo: '#8219ff',
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
  title: 'Bocchi The Admin!',
  favicons: ['/favicon.png'],
  routes: [
    {
      path: '/login',
      component: './Login',
    },
    {
      path: '/',
      component: '@/layouts/ProLayout/index',
      routes: router.routes,
    },
  ],
  npmClient: 'pnpm',
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },
});
