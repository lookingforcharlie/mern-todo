import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Keep the code clean and maintainable
export default (req: Request, res: Response) => {
  console.log(req.body.password);
  if (req.body.password === process.env.PASSWORD) {
    const token = jwt.sign(
      {
        userId: 1,
      },
      process.env.SECRET as string
    );
    res.json({
      token,
    });
  } else {
    res.status(401).send('Wrong password');
  }
};

//jwt.io to check the meaning of token
// jwt token is not encrypted, anyone can see it. don't put personal info in the token
// jwt token is like a key to the door, we still need to create a door handle and a key slot in it that user and unlock the door with
