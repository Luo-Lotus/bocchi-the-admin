# Introduce

## 技术栈

通用：

- _包管理器_ - **pnpm**
- _接口定义_ - **tRPC**

前端：

- _语言_ - **Typescript**
- _UI框架_ - **React**
- _脚手架_ - **UmiJs**
- _UI组件_ - **Ant Design**

后端:

- _数据库操作_ - **Prisma**
- _Web框架_ - **fastify**
- _校验_ - **zod**

## feature

TODO:

# Getting Start

1. `pnpm install` 安装依赖
2. 配置 `server` 环境变量

```bash
# app/sever/.env
# 数据库推荐使用postgresQL，同时也支持MySQL和MongoDB，但是项目是根据postgresQL开发的，其他数据库可能会出现问题
# 详见 https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgresql
DATABASE_URL="数据库地址"
JWT_SECRET="jwt秘钥"
```

3. `pnpm -F @monorepo/server run prisma-generate` 生成数据库字段类型
4. `pnpm run client-dev` 启动client dev
5. `pnpm run server-dev` 启动server dev
