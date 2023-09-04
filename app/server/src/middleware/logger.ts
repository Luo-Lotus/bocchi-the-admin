import { middleware } from '../initTRPC';

const loggerMiddleware = middleware(async (opts) => {
  const { req } = opts.ctx;
  const start = new Date();
  const result = await opts.next();
  const durationMs = Date.now() - start.valueOf();
  const loggerString = `${start.toLocaleString()} durationMs=${durationMs} path=${
    opts.path
  } ip=${req.socket.remoteAddress}`;

  result.ok
    ? console.log('[SUCCESS]', loggerString)
    : console.error('[FAILED]', loggerString);

  return result;
});

export default loggerMiddleware;
