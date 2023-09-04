import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@monorepo/server/src/router';
import {
  QueryClient,
  QueryClientProvider,
  QueryClientConfig,
} from '@tanstack/react-query';
import {
  TRPCLink,
  createWSClient,
  httpBatchLink,
  splitLink,
  wsLink,
} from '@trpc/client';
import { PropsWithChildren, useState } from 'react';

type IProps = PropsWithChildren<{
  queryClientConfig?: QueryClientConfig;
  TRPCLink?: TRPCLink<AppRouter>[];
  host?: string;
}>;

// 初始化api
export const api = createTRPCReact<AppRouter>();

export function ApiProvider({
  queryClientConfig,
  links,
  children,
  host = 'localhost',
}: IProps) {
  const [wsClient] = useState(
    createWSClient({
      url: `ws://${host}:3000/api`,
    })
  );
  const [queryClient] = useState(new QueryClient(queryClientConfig));
  const [trpcClient] = useState(
    api.createClient({
      links: [
        ...links,
        splitLink({
          condition: (op) => op.type === 'subscription',
          false: httpBatchLink({
            url: `http://${host}:3000/api`,
          }),
          true: wsLink({
            client: wsClient,
          }),
        }),
      ],
    })
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  );
}
