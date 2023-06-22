import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../../server/src/router';

export const api = createTRPCReact<AppRouter>();
