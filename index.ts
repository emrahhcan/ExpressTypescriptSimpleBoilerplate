import 'reflect-metadata';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import { mongooseConnection } from './libs/config/db.config';
import { CLIENT_URL, PORT } from './libs/common/constant/dotenv.constant';
import API from './src/app';

const app: express.Application = express();

const simpleCorsOptions = {
  origin: [CLIENT_URL],
  credentials: true,
};

app.use(cors(simpleCorsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

app.use('/', API);

mongoose.set('strictQuery', false);
mongooseConnection();

app.listen(PORT, () => {
  console.log(`Server is up and ready on port ${PORT}`);
});
