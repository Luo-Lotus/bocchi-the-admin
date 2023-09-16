// 运行时配置
import { RuntimeConfig, history } from '@umijs/max';
import useUser from './models/useUser';
import { getToken } from './utils/authUtil';
export const getInitialState: RuntimeConfig['getInitialState'] = async () => {
  const token = getToken();
  if (!token) {
    history.replace('/login');
  } else {
    useUser.getState().fetchUser();
  }
  return {};
};

// export const rootContainer: RuntimeConfig['rootContainer'] = async (dom) => {
//   return (
//     <trpc.Provider client={trpcClient} queryClient={queryClient}>
//       <QueryClientProvider client={queryClient}>{dom}</QueryClientProvider>
//     </trpc.Provider>
//   );
// };
