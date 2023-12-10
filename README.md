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
- _状态管理_ - **Zustand**

后端:

- _数据库操作_ - **Prisma**
- _Web框架_ - **fastify**
- _校验_ - **zod**

## Feature

- 前后端共用一套类型，前端可以通过RPC调用后端接口，完全端到端类型安全
- 对于简单的增删改查能根据db的 schema自动生成api与页面，可以对生成器模板进行自定义开发。doing （已完成zodSchema自动生动）
- RBAC权限系统。
- 提供一些可选择的开箱即用的功能（如API权限管理、数据幂等性校验、软删除等）

  TODO:

- 方便的主题切换与定制
- 提供基本的运维工具（前后端监控、服务器监控、CI/CD、Docker部署、日志等）
- 后端错误拦截优化
- tRPC微服务探索

# Getting Start

1. `pnpm install` 安装依赖
2. 配置 `server` 环境变量

```bash
# packages/sever/.env
# 数据库推荐使用postgresQL，同时也支持MySQL和MongoDB，但是项目是根据postgresQL开发的，其他数据库可能会出现问题
# 详见 https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgresql
DATABASE_URL="数据库地址"
JWT_SECRET="jwt秘钥"
```

3. 全局安装`tsx`,`pnpm install -g tsx`
4. 在 server 目录下，通过 prisma schema 迁移表到数据库 `npx prisma db push`
5. 添加Role, User, Account数据， Account依赖User，User依赖，Role的Permissions数组可以暂时填0-8
6. `pnpm -F @bta/server run prisma-generate` 生成数据库字段类型Role
7. `pnpm run dev:client` 启动client dev
8. `pnpm run dev:server` 启动server dev
