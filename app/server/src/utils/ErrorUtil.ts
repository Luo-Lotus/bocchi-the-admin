import { TRPCError } from '@trpc/server';

export const throwTRPCBadRequestError = <T>(message: string, cause?: T) => {
  throw new TRPCError({
    message,
    code: 'BAD_REQUEST',
    cause: cause,
  });
};

export const throwTRPCBadUnauthorized = (message: string) => {
  throw new TRPCError({
    message,
    code: 'UNAUTHORIZED',
  });
};
