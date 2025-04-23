// server.js (development)

import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import sequelize from './config/database.js';
import redis from './config/redis.js';

// Models (so Sequelize picks them up)
import './models/user.model.js';
import './models/emailVerification.model.js';

import authRoutes from './routes/auth.route.js';
import globalErrorHandler from './controllers/auth/errorController.js';
import AppError from './utils/AppError.js';
import logger from './utils/logger.js';

dotenv.config();

const app = express();

// 1) Security & CORS
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  })
);

// 2) Rate Limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests, please try again later.',
  })
);

// 3) HTTP request logging → Winston
app.use(
  morgan('combined', {
    stream: { write: (msg) => logger.info(msg.trim()) },
  })
);

// 4) Body parser
app.use(express.json());

// 5) Redis health‑check (optional dev helper)
(async () => {
  try {
    await redis.set('healthcheck', 'ok');
    const val = await redis.get('healthcheck');
    logger.debug('Redis OK:', val);
  } catch (err) {
    logger.error('Redis error:', err);
  }
})();

// 6) Routes
app.use('/api/auth', authRoutes);

// 7) 404 for unmatched routes
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl}`, 404));
});

// 8) Global Error Handler
app.use(globalErrorHandler);

// 9) Start DB & Server
(async () => {
  try {
    await sequelize.authenticate();
    logger.info('DB authenticated');
    await sequelize.sync({ alter: true }); // dev only
    logger.info('DB synced (alter)');
    app.listen(process.env.PORT || 3000, () =>
      logger.info(`Server running on port ${process.env.PORT || 3000}`)
    );
  } catch (err) {
    logger.error('Startup error:', err);
    process.exit(1);
  }
})();
