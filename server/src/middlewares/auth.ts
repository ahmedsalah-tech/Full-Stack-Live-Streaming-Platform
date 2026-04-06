import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

const config = process.env;

export interface AuthRequest extends Request {
  user?: any;
}

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token =
    req.body?.token || req.query.token || req.headers['authorization'];

  if (!token) {
    return res.status(401).send('A token is required for authentication');
  }

  if (!config.TOKEN_KEY) {
    return res.status(500).send('Server configuration error');
  }

  try {
    token = token.replace(/^Bearer\s+/, '');
    const decoded = jwt.verify(token, config.TOKEN_KEY);

    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }

  return next();
};
