// Node Modules
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import serverlessExpress from '@codegenie/serverless-express';

// Database
import connectToMongo from '@/database/mongo.db';

// Middlewares
import errorMiddleware from '@/middlewares/error.middleware';

// Routes
import authRoute from '@/routes/auth.route';
import healthRoute from '@/routes/health.route';

const app = express();

dotenv.config({ path: '.env.local' });
connectToMongo();

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/health', healthRoute);

app.use(errorMiddleware);

app.listen(5000, () => {
  console.log(`Server is running on port ${5000}`);
});

export const handler = serverlessExpress({ app });
