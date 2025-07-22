import { Router } from 'express';
import { tokenBucket } from '../middlewares/token-bucket';
import { leakyBucket } from '../middlewares/leaky-bucket';
import { fixedWindow } from '../middlewares/fixed-window';
import { slidingWindow } from '../middlewares/sliding-window';

const router = Router();

router.get('/token-bucket', tokenBucket, (_, res) => {
  res.status(200).json({ data: { message: 'token bucket algorithm' } });
});

router.get('/leaky-bucket', leakyBucket, (_, res) => {
  res.status(200).json({ data: { message: 'leaky bucket algorithm' } });
});

router.get('/fixed-window', fixedWindow, (_, res) => {
  res.status(200).json({ data: { message: 'fixed window algorithm' } });
});

router.get('/sliding-window', slidingWindow, (_, res) => {
  res.status(200).json({ data: { message: 'sliding window algorithm' } });
});

export default router;
