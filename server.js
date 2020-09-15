const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const movieData = require('./movie-data');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());


app.get('/movie', (req, res, next) => {
  res.json(movieData);
});




const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
