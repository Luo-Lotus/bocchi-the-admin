// 运行时配置
import { AppRouter } from '@monorepo/server/src/router';
import { defineApp } from '@umijs/max';
export default defineApp({
  async getInitialState(): Promise<{ name: string }> {
    return { name: '@umijs/max' };
  },
});
// export const layout = () => {
//   return {
//     logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
//     menu: {
//       locale: false,
//     },
//   };
// };
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import SuperJSON from 'superjson';

const client = createTRPCProxyClient<AppRouter>({
  transformer: SuperJSON,
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      // You can pass any HTTP headers you wish here
      async headers() {
        return {
          authorization: '',
        };
      },
    }),
  ],
});
client.userRouter.signIn.mutate({}).then((res) => {
  res?.user.avatar;
});
