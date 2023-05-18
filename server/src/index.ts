import cors from 'cors';
import { config } from 'dotenv';
import express, { Request, Response } from 'express';
// morgan allows you to get additional feedback from when you make request from endpoint
import mongoose from 'mongoose';
import morgan from 'morgan';
import router from './router';

const app = express();
const PORT = process.env.PORT || 5555;
config();

app.use(express.json());

app.use(
  cors({
    origin: '*',
  })
);
app.use(morgan('tiny'));
// allow us to put all of our route definitions in a different file to make the code cleaner
app.use(router);

mongoose.connect(process.env.MONGO_URI as string).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening to port:${PORT}`);
  });
});
