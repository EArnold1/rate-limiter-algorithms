import { Router } from 'express';
import { tokenBucket } from '../middlewares/token-bucket';
import { leakyBucket } from '../middlewares/leaky-bucket';

const router = Router();

router.get('/token-bucket', tokenBucket, (req, res) => {
  res.status(200).json({ data: { message: 'token bucket algorithm' } });
});

router.get('/leaky-bucket', leakyBucket, (req, res) => {
  res.status(200).json({ data: { message: 'leaky bucket algorithm' } });
});

export default router;
