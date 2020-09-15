require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const movieData = require('./movie-data');

function validateBearerToken (req, res, next){
  const apiToken = process.env.API_TOKEN;
  const authVal = req.get('Authorization');
  
  if (!authVal.toLowerCase().startsWith('bearer') || authVal.split(' ')[1] !== apiToken){
    return res.status(401).json({message: 'Unauthorized Request'});  
  }  
  next();
}

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(validateBearerToken);


app.get('/movie', (req, res) => {
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
