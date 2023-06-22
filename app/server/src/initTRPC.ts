import { initTRPC } from '@trpc/server';
import { Context } from './context';

const trpc = initTRPC.context<Context>().create();

export const procedure = trpc.procedure;
export const middleware = trpc.middleware;
export const router = trpc.router;
export const mergeRouters = trpc.mergeRouters;
