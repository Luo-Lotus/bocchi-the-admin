import { clearToken } from '@/utils/authUtil';
import type { AppRouter } from '@bta/server/src/router';
import { TRPCLink } from '@trpc/client';
import { observable } from '@trpc/server/observable';
import { history } from '@umijs/max';
import { message } from 'antd';
export const customLink: TRPCLink<AppRouter> = () => {
  // here we just got initialized in the app - this happens once per app
  // useful for storing cache for instance
  return ({ next, op }) => {
    // this is when passing the result to the next link
    // each link needs to return an observable which propagates results
    return observable((observer) => {
      const unsubscribe = next(op).subscribe({
        next(value) {
          observer.next(value);
        },
        error(err) {
          if (err.data?.code === 'UNAUTHORIZED') {
            clearToken();
            history.replace('/login');
          }
          message.error(err.message);
          observer.error(err);
        },
        complete() {
          observer.complete();
        },
      });
      return unsubscribe;
    });
  };
};
