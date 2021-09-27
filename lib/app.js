import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import pokemonWeight from './controllers/pokemonWeight.js';
import pokemonAbility from './controllers/pokemonAbility.js';

const app = express();

app.use(express.json());
app.use('/api/pokemon/weight', pokemonWeight);
app.use('/api/pokemon/ability', pokemonAbility);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
