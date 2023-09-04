import * as trpc from "@trpc/server";

import type { Context } from '../../../../context';

import trpcOptions from '../../../../trpcOptions';

export const t = trpc.initTRPC.context<Context>().create(trpcOptions);

import defaultMiddleware from '../../../../middleware';

export const globalMiddleware = t.middleware(defaultMiddleware);

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure

  .use(globalMiddleware)






