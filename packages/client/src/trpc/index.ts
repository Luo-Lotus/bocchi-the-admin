import { AppRouter } from '@bta/server/src/router';
import { createTRPCClient, httpBatchLink, loggerLink } from '@trpc/client';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import _ from 'lodash';
import SuperJSON from 'superjson';
import { getToken } from '../utils/authUtil';
import { customLink } from './links/customLink';

const isProduction = process.env.NODE_ENV !== 'development';

const client = createTRPCClient<AppRouter>({
  links: _.compact([
    !isProduction && loggerLink(),
    customLink,
    httpBatchLink({
      url: 'http://localhost:3521/api',
      // You can pass any HTTP headers you wish here
      async headers() {
        return {
          authorization: getToken() || '',
        };
      },
      transformer: SuperJSON,
    }),
  ]),
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
