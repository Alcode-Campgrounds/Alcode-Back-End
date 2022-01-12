const express = require('express');
const notFoundMiddleware = require('./middleware/not-found.js');
const errorMiddleware = require('./middleware/error.js');
const cookieParser = require('cookie-parser');
const auth = require('./controllers/auth/auth');
const campgrounds = require('./controllers/campgrounds');
const cors = require('cors');

const app = express();
app.use(cors({
  origin:true,    
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/alcode/auth', auth);
app.use('/api/alcode/campgrounds', campgrounds);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
