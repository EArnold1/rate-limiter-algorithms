import { RequestHandler } from 'express';
import { limiter as leakyBucketLimiter } from '../algorithms/leaky-bucket/limiter';

// An example on how to use the leaky bucket limiter

const { make_request } = leakyBucketLimiter({
  capacity: 5,
  leakRate: 1 * 60 * 1000,
});

const leakyBucketExample: RequestHandler = (req, res, next) => {
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

export { leakyBucketExample as leakyBucket };
