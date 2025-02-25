import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from '@trpc/server/adapters/fastify';
import fastify from 'fastify';
import { createContext } from './context';
import { AppRouter, appRouter } from './router';
import cors from '@fastify/cors';
import ws from '@fastify/websocket';
import dotenv from 'dotenv';

dotenv.config();

const { PORT = 3521 } = process.env;

const server = fastify({
  maxParamLength: 5000,
});

server.register(cors, {}); // 跨域
server.register(ws); // webSocket
// TRPC配置
server.register(fastifyTRPCPlugin, {
  prefix: '/api', // 路由前缀 如 localhost/api/xx/xx
  useWSS: true, // 使用websocket
  trpcOptions: {
    router: appRouter,
    createContext,
    onError: (params) => {
      console.error(params.error.stack);
    },
  } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'], // trpc配置
});

// 接口文档
// server.get('/api/docs', (_, res) => {
//   return res.header('content-type', 'text/html').send(
//     renderTrpcPanel(appRouter, {
//       url: 'http://localhost:3521/api', // 文档中发送请求的url
//       transformer: 'superjson',
//     }),
//   );
// });

// 启动项目
(async () => {
  try {
    await server.listen({ port: Number(PORT), host: '0.0.0.0' });
    console.log(`server started on port ${PORT}`);
  } catch (err) {
    console.log(err);
    server.log.error(err);
    process.exit(1);
  }
})();
