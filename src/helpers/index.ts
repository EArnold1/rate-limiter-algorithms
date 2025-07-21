import { Request } from 'express';

export function getIpAddress(req: Request) {
  const addr =
    req.ip ?? req.headers['x-forwarded-for'] ?? req.socket.remoteAddress;

  if (!addr) throw new Error('ip address is required');

  if (Array.isArray(addr)) return addr[0];

  return addr;
}
