import { TRPCError } from '@trpc/server';

export const throwTRPCBadRequestError = (message: string) => {
  throw new TRPCError({
    message,
    code: 'BAD_REQUEST',
  });
};

export const throwTRPCBadUnauthorized = (message: string) => {
  throw new TRPCError({
    message,
    code: 'UNAUTHORIZED',
  });
};
