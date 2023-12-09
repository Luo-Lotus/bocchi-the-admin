// 运行时配置
import { RuntimeConfig, history, matchRoutes } from '@umijs/max';
import useUser from './models/useUser';
import { getToken, withAuth } from './utils/authUtil';

export const getInitialState: RuntimeConfig['getInitialState'] = async () => {
  const token = getToken();
  if (!token) {
    history.replace('/login');
  } else {
    return (await useUser.getState().fetchUser()) as any;
  }
  return {};
};

export const onRouteChange: RuntimeConfig['onRouteChange'] = async ({
  clientRoutes,
  location,
}) => {
  const route: any = matchRoutes(clientRoutes, location.pathname)?.pop()?.route;
  console.log(route);

  if (route?.authCode && !withAuth(true, route.authCode)) {
    history.replace('/403');
  }
};
// export const rootContainer: RuntimeConfig['rootContainer'] = async (dom) => {
//   return (
//     <trpc.Provider client={trpcClient} queryClient={queryClient}>
//       <QueryClientProvider client={queryClient}>{dom}</QueryClientProvider>
//     </trpc.Provider>
//   );
// };
