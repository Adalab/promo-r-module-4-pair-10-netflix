const express = require('express');
const cors = require('cors');
const movies = require('./data/movies.json');
const users = require('./data/users.json');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());
server.set('view engine', 'ejs');

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get('/movies', (req, res) => {
  const genderFilterParam = req.query.gender;
  const sortFilterParam = req.query.sort;
  const filteredMovies = movies.filter((eachMovie) => {
    return eachMovie.gender.includes(genderFilterParam);
  });
  if (sortFilterParam === 'asc') {
    filteredMovies.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      } else if (a.title > b.title) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    filteredMovies.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      } else if (a.title > b.title) {
        return 1;
      } else {
        return 0;
      }
    });
    filteredMovies.reverse();
  }
  const response = {
    success: true,
    movies: filteredMovies,
  };
  res.json(response);
});
console.log('hoooolis');
server.post('/login', (req, res) => {
  console.log(req.body);
  const userLogin = users.find((user) => user.email.includes(req.body.email));
  if (userLogin) {
    const response = {
      success: true,
      userId: userLogin.id,
    };
    res.json(response);
  } else {
    const response = {
      success: false,
      errorMessage: 'Usuaria/o no encontrada/o',
    };
    res.json(response);
  }
});

server.get('/movie/:movieId', (req, res) => {
  console.log(req.params);
  const foundMovie = movies.find((movie) => movie.id === req.params.movieId);
  console.log(foundMovie);
  res.render('movie', foundMovie);
});

//creamos servidor estático
const staticServer = './src/public-react';
server.use(express.static(staticServer));
//servidor estático de imágenes
const staticServerImages = './src/public-movies-images';
server.use(express.static(staticServerImages));
//servido estático de estilos CSS
const staticServerStyles = './src/public-styles';
server.use(express.static(staticServerStyles));
