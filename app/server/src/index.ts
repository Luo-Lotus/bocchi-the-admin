import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastify from 'fastify';
import { createContext } from './context';
import { appRouter } from './router';
import cors from '@fastify/cors';
import ws from '@fastify/websocket';
import dotenv from 'dotenv';

dotenv.config();

const server = fastify({
  maxParamLength: 5000,
});

server.register(cors, {}); // 跨域
server.register(ws); // webSocket
// TRPC
server.register(fastifyTRPCPlugin, {
  prefix: '/api',
  useWSS: true,
  trpcOptions: { router: appRouter, createContext },
});

(async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('服务器在3000端口启动!!');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
