import trpc, { RouterInput, RouterOutput } from '@/trpc';
import { setToken } from '@/utils/authUtil';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export type User = RouterOutput['userRouter']['getUserInfoByToken'];
export type SignInParams = RouterInput['userRouter']['signIn'];

const useUser = create(
  combine({ user: null as User | null }, (set) => ({
    fetchUser: async () =>
      set({
        user: await trpc.userRouter.getUserInfoByToken.query(),
      }),
    signIn: async (signInParams: SignInParams) => {
      const res = await trpc.userRouter.signIn.mutate(signInParams);
      res?.authorization && setToken(res?.authorization);
      set({ user: res.user[0] });
      return res;
    },
  })),
);

export default useUser;
