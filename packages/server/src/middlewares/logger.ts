import { TRACE_ID_HEADER_NAME } from '../constants/Common';
import { middleware } from '../initTRPC';
import { v4 } from 'uuid';

const loggerMiddleware = middleware(async (opts) => {
  const { req, res } = opts.ctx;
  const traceId = v4();

  res.headers({
    [TRACE_ID_HEADER_NAME]: traceId,
  });
  opts.ctx.traceId = traceId;

  const start = new Date();
  const result = await opts.next();
  const durationMs = Date.now() - start.valueOf();
  const loggerString = `${start.toLocaleString()} durationMs=${durationMs} path=${
    opts.path
  } ip=${req.socket.remoteAddress} traceId=${traceId}`;
  req;
  result.ok
    ? console.log('\x1B[32m%s\x1B[0m', '[SUCCESS]', loggerString)
    : console.error('\x1B[31m%s\x1B[0m', '[FAILED]', loggerString);

  return result;
});

export default loggerMiddleware;
