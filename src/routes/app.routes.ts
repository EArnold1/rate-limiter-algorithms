import { Router } from 'express';
import { tokenBucket } from '../middlewares/token-bucket';

const router = Router();

router.get('/token-bucket', tokenBucket, (req, res) => {
  res.status(200).json({ data: { message: 'token bucket algorithm' } });
});

export default router;
