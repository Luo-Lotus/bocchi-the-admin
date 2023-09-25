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

TODO:

- 对于简单的增删改查能根据db的 schema自动生成。
- 避免过度封装，生成的代码尽量只是用Antd Pro自带的组件，方便扩展（Antd Pro 本身强大的功能已经可以除了必要的配置项外其他代码不超过一百行）
- RABC权限系统。
- 方便的主题切换与定制
- 提供一些可选择的开箱即用的功能（如API权限管理、数据幂等性校验、软删除等）
- 提供基本的运维工具（前后端监控、服务器监控、CI/CD、Docker部署、日志等）

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

3. 在 server 目录下，通过 prisma schema 迁移表到数据库 `npx prisma db push`
4. 添加Role, User, Account数据， Account依赖User，User依赖，Role的Permissions数组可以暂时填1-8
5. `pnpm -F @bta/server run prisma-generate` 生成数据库字段类型Role
6. `pnpm run client-dev` 启动client dev
7. `pnpm run server-dev` 启动server dev
