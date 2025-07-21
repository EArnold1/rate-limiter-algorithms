import { RequestHandler } from 'express';
import { limiter as tokenBucketLimiter } from '../algorithms/token-bucket/limiter';

// An example on how to use the token bucket  limiter

const { makeRequest } = tokenBucketLimiter({
  capacity: 5,
  refillRate: 1,
  timer: 1 * 60 * 1000,
});

const tokenBucketMiddleware: RequestHandler = (req, res, next) => {
  try {
    makeRequest(req);
    next();
  } catch (error) {
    let error_message = 'too many requests';
    if (error instanceof Error) {
      error_message = error.message;
    }
    res.status(429).json({ error: { message: error_message } });
  }
};

export { tokenBucketMiddleware as tokenBucket };
