import {
  HomeOutlined,
  KeyOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { MenuDataItem } from '@ant-design/pro-components';
import AuthTree from '@bta/common/AuthTree';
import { defineConfig } from '@umijs/max';
import React from 'react';
React;

const router = {
  path: '/',
  routes: [
    {
      name: '首页',
      path: 'home',
      component: './Home',
      icon: <HomeOutlined />,
    },
    {
      name: '权限设置',
      path: 'auth',
      component: './Auth',
      authCode: AuthTree.permissionModule.code,
      icon: <KeyOutlined />,
    },
    {
      name: '角色管理',
      path: 'role',
      component: './Role',
      icon: <SolutionOutlined />,
    },
    {
      name: '用户管理',
      path: 'user',
      component: './User',
      icon: <UserOutlined />,
    },
  ] as MenuDataItem[] &
    Exclude<ReturnType<typeof defineConfig>['routes'], false> & {
      authCode?: number;
    },
};
export default router;
