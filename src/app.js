import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import authRoutes from './routes/auth.route.js';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import redis from './config/redis.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

const rateLimitOptions = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
};
const limiter = rateLimit(rateLimitOptions);
app.use(limiter);
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  const morganOptions = {
    skip: (req, res) => res.statusCode < 400,
  };
  app.use(morgan('dev', morganOptions));
} else {
  app.use(morgan('combined'));
}

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database connected and synced');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });
