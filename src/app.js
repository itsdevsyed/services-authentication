import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import authRoutes from './routes/auth.route.js';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import redis from './config/redis.js';
import './models/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

app.use(morgan('combined'));

app.use(express.json());

(async () => {
  try {
    await redis.set('test-key', 'Hello:');
    const value = await redis.get('test-key');
    console.log('Redis test value:', value);
  } catch (error) {
    console.error('Redis testing failed:', error.message);
  }
})();

app.use('/api/auth', authRoutes);

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

sequelize.sync() 
  .then(() => {
    console.log('Database synced!');
    return sequelize.authenticate();
  })
  .then(() => {
    console.log('Database connection established successfully.');
    app.listen(port, () => {
      console.log(`Production server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to sync/authenticate database:', err.message);
    process.exit(1);
  });
