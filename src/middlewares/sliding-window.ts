import { RequestHandler } from 'express';
import { limiter as slidingWindowLimiter } from '../algorithms/sliding-window/limiter';

// An example on how to use the sliding window limiter

const { makeRequest } = slidingWindowLimiter({
  maxRequests: 5,
  windowSize: 1 * 60 * 1000,
});

const slidingWindowMiddleware: RequestHandler = (req, res, next) => {
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

export { slidingWindowMiddleware as slidingWindow };
