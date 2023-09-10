import { AppRouter } from '@monorepo/server/src/router';
import { QueryClient } from '@tanstack/react-query';
import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import SuperJSON from 'superjson';
import { getToken } from '../utils/authUtil';
import { customLink } from './links/customLink';

const client = createTRPCProxyClient<AppRouter>({
  transformer: SuperJSON,
  links: [
    loggerLink(),
    customLink,
    httpBatchLink({
      url: 'http://localhost:3000/api',
      // You can pass any HTTP headers you wish here
      async headers() {
        return {
          authorization: getToken() || '',
        };
      },
    }),
  ],
});

// export const trpc = createTRPCReact<AppRouter>();
// export const queryClient = new QueryClient();
// export const trpcClient = trpc.createClient({
//   transformer: SuperJSON,
//   links: [
//     loggerLink(),
//     customLink,
//     httpBatchLink({
//       url: 'http://localhost:3000/api',
//       // You can pass any HTTP headers you wish here
//       async headers() {
//         return {
//           authorization: getToken() || '',
//         };
//       },
//     }),
//   ],
// });

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export default client;
