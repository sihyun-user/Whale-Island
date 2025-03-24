import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import logger from 'morgan';
import dotenv from 'dotenv';

import router from './routes';
import errHandle from './middlewares/error';
import AppError from './helpers/appError';
import errorState from './helpers/errorState';

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
  })
);

app.use('/api/v1', router());

app.use('*', (req, res, next) => {
  AppError(errorState.ROUTE_NOT_FOUND, next);
});

app.use(errHandle);

const server = http.createServer(app);
server.listen(process.env.PORT);
