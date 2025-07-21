import { RequestHandler } from 'express';
import { limiter as fixedWindowLimiter } from '../algorithms/fixed-window/limiter';

// An example on how to use the fixed window limiter

const { makeRequest } = fixedWindowLimiter({
  maxRequests: 5,
  windowSize: 1 * 60 * 1000,
});

const fixedWindowMiddleware: RequestHandler = (req, res, next) => {
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

export { fixedWindowMiddleware as fixedWindow };
