import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import pokemonWeight from './controllers/pokemonWeight.js';

const app = express();

app.use(express.json());
app.use('/api/pokemon/weight', pokemonWeight);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
