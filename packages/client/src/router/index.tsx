import {
  HomeOutlined,
  KeyOutlined,
  SolutionOutlined,
  TeamOutlined,
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
      path: '/home',
      component: './Home',
      icon: <HomeOutlined />,
    },
    {
      name: '权限设置',
      path: '/auth',
      component: './Auth',
      authCode: AuthTree.permissionModule.code,
      icon: <KeyOutlined />,
    },
    {
      name: '角色管理',
      path: '/role',
      component: './Role',
      authCode: AuthTree.roleModule.code,
      icon: <SolutionOutlined />,
    },
    {
      name: '用户管理',
      path: '/user',
      component: './User',
      authCode: AuthTree.userModule.code,
      icon: <TeamOutlined />,
    },
    {
      name: '账户管理',
      path: '/account',
      component: './Account',
      authCode: AuthTree.accountModule.code,
      icon: <UserOutlined />,
    },
  ] as MenuDataItem[] &
    Exclude<ReturnType<typeof defineConfig>['routes'], false> & {
      authCode?: number;
    },
};
export default router;
