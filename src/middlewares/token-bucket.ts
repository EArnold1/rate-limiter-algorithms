import { RequestHandler } from 'express';
import { limiter as tokenBucketLimiter } from '../algorithms/token-bucket/limiter';

// An example on how to use the token bucket  limiter

const { make_request } = tokenBucketLimiter({
  capacity: 5,
  refillRate: 1,
  timer: 1 * 60 * 1000,
});

const tokenBucketExample: RequestHandler = (req, res, next) => {
  // req.ip ?? req.headers['x-forwarded-for'] ?? req.socket.remoteAddress;
  try {
    make_request(req.ip!);
    next();
  } catch (error) {
    let error_message = 'too many requests';
    if (error instanceof Error) {
      error_message = error.message;
    }
    res.status(429).json({ error: { message: error_message } });
  }
};

export { tokenBucketExample as tokenBucket };
