import dotenv from 'dotenv';
import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import favoritesController from './controllers/favorites.js';
// import cors from 'cors';

dotenv.config();

// app.use(cors());
const app = express();

app.use(express.json());

app.use(favoritesController);

if (app) {
  console.log('don\'t look behind you');
}

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
