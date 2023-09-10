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
};

export default AuthTree;
