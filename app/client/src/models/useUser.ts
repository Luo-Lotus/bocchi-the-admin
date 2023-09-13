import trpc, { RouterOutput } from '@/trpc';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export type User = RouterOutput['userRouter']['getUserInfoByToken'];

const useUser = create(
  combine({ user: null as User | null }, (set) => ({
    fetchUser: async () =>
      set({
        user: await trpc.userRouter.getUserInfoByToken.query(),
      }),
  })),
);

export default useUser;
