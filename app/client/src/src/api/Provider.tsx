import {
  QueryClient,
  QueryClientProvider,
  QueryClientConfig,
} from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { PropsWithChildren, useState } from 'react';
import { api } from '.';

type IProps = PropsWithChildren<{
  queryClientConfig?: QueryClientConfig;
}>;

export default function ApiProvider({ queryClientConfig, children }: IProps) {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/api',
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
