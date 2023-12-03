import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';
import { TRPCError } from '@trpc/server';
import { ZodError } from 'zod';
import { formatErrorMessage } from './zodUtil';

export const throwTRPCBadRequestError = <T>(message: string, cause?: T) => {
  throw new TRPCError({
    message,
    code: 'BAD_REQUEST',
    cause: cause,
  });
};

export const throwTRPCUnauthorized = (message: string) => {
  throw new TRPCError({
    message,
    code: 'UNAUTHORIZED',
  });
};

export const throwBusinessError = (
  code: number,
  message: string,
  errorData?: any,
) => {
  throw {
    name: 'BusinessError',
    message,
    stack: message,
    data: {
      code,
      message,
      errorData,
    },
  };
};

export const handlePrismaError = (error: TRPCError) => {
  if (error.cause instanceof PrismaClientKnownRequestError) {
    return {
      message: error.cause.meta?.cause || '数据库操作错误',
    };
  }
};

export const handleZodError = (error: TRPCError) => {
  if (error.cause instanceof ZodError) {
    return {
      message: formatErrorMessage(error.message),
      data: {
        zodError: error.cause.flatten(),
      },
    };
  }
};
