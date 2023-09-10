import trpc from '@/trpc';
// 运行时配置
import { RuntimeConfig, history } from '@umijs/max';
import { getToken } from './utils/authUtil';
export const getInitialState: RuntimeConfig['getInitialState'] = async () => {
  const token = getToken();
  if (!token) {
    history.replace('/login');
  } else {
    const user = await trpc.userRouter.getUserInfoByToken.query();
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
