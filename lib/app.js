import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import pokemonWeight from './controllers/pokemonWeight.js';
import pokemonAbility from './controllers/pokemonAbility.js';
import pokemonHeight from './controllers/pokemonHeight.js';
import benderQuote from './controllers/benderQuote.js';

const app = express();

app.use(express.json());
app.use('/api/pokemon/weight', pokemonWeight);
app.use('/api/pokemon/ability', pokemonAbility);
app.use('/api/pokemon/height', pokemonHeight);
app.use('/api/bender/quote', benderQuote);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
