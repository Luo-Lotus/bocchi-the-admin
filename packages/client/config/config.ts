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
  plugins: [
    require.resolve('@umijs/plugins/dist/unocss'),
    'umi-plugin-keep-alive',
  ],
  unocss: {
    // 检测 className 的文件范围，若项目不包含 src 目录，可使用 `pages/**/*.tsx`
    watch: ['src/**/*.tsx'],
  },
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
      name: '无权限',
      path: '/403',
      component: './NoPermission',
    },
    {
      path: '/',
      component: '@/layouts/ProLayout/index',
      routes: router.routes,
    },
    {
      name: '未找到页面',
      path: '*',
      component: './NotFound',
    },
  ],
  npmClient: 'pnpm',
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },
});
