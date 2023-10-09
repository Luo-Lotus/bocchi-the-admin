const AuthTree = {
  name: '全部',
  code: 0,
  permissionModule: {
    code: 1,
    name: '权限模块',
    create: {
      code: 2,
      name: '创建',
    },
    delete: {
      code: 3,
      name: '删除',
    },
    update: {
      code: 4,
      name: '更新',
    },
  },
  roleModule: {
    code: 5,
    name: '角色模块',
    create: {
      code: 6,
      name: '创建',
    },
    update: {
      code: 7,
      name: '更新',
    },
    delete: {
      code: 8,
      name: '删除',
    },
  },
  accountModule: {
    code: 9,
    name: '账户模块',
    create: {
      code: 10,
      name: '创建',
    },
    update: {
      code: 11,
      name: '更新',
    },
    delete: {
      code: 12,
      name: '删除',
    },
    /** 可以直接修改所有人的密码！！ 请谨慎赋予权限 */
    changePassword: {
      code: 17,
      name: '修改密码',
    },
  },
  userModule: {
    code: 13,
    name: '用户模块',
    create: {
      code: 14,
      name: '创建',
    },
    update: {
      code: 15,
      name: '更新',
    },
    delete: {
      code: 16,
      name: '删除',
    },
  },
};

export default AuthTree;
