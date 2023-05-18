import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// middleware function that can run before every single endpoint request
// we need to tell express where to use this middleware function
export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).send('Invalid Credentials');
  } else {
    // Bearer in front of actual token, that's why we need split it and get the token value
    const token = authHeader.split(' ')[1];
    console.log('Your Token:', token);
    // verify the token
    jwt.verify(token, process.env.SECRET as string, (err, decoded) => {
      if (err) {
        res.status(403).send('Invalid Credentials');
      } else {
        // allow the router go to the next section
        next();
      }
    });
  }
};

// How jwt works
// you will pass jwt token in the header: key: Authorization, Value: Bearer token
// 401 means you didn't provide the token or the token is like malformed
// 403 means something wrong with your token, maybe you are trying to hack the system
