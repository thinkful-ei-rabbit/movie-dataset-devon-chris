/* eslint-disable indent */
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
  // let response = MOVIES;

  // if (req.query.genre) {
  //   response = response.filter(movie =>
  //     movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
  //   )
  // }

  const {genre='', country='', avg_vote=''} = req.query;
  let data = movieData;
  //if (genre) filter
  if (genre){
    data = data.filter(movie =>
      movie.genre.toLowerCase().includes(genre.toLowerCase()));

  }
  //if(country)filter
  if (country){
    data = data.filter(movie =>
      movie.country.toLowerCase().includes(country.toLowerCase()));

  }
  //if (avg_vote)filter
  if (avg_vote){
    data = data.filter(movie =>
      Number(movie.avg_vote) >= Number(avg_vote));
  }
  
  res.json(data);
});




const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
