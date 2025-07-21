import { RequestHandler } from 'express';
import { limiter as fixedWindowLimiter } from '../algorithms/fixed-window/limiter';

// An example on how to use the fixed window limiter

const { make_request } = fixedWindowLimiter({
  maxRequests: 5,
  windowSize: 1 * 60 * 1000,
});

const fixedWindowMiddleware: RequestHandler = (req, res, next) => {
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

export { fixedWindowMiddleware as fixedWindow };
