const express = require('express');
const cors = require('cors');
//const movies = require('./data/movies.json');
const users = require('./data/users.json');

//crear base de datos
const Database = require('better-sqlite3');
const db = new Database('./src/db/database.db', {
  verbose: console.log,
});

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
  //constantes de filtros
  const genderFilterParam = req.query.gender;
  const sortFilterParam = req.query.sort.toUpperCase();
  //traer todas las pelis
  const query = db.prepare(`SELECT * FROM movies ORDER BY title ${sortFilterParam}`);
  const movies = query.all();
  //filtrar por género
  const queryGender = db.prepare(`SELECT * FROM movies WHERE gender = ? ORDER BY title ${sortFilterParam}`);
  const filteredByGender = queryGender.all(genderFilterParam);
  if (genderFilterParam !== '') {
    const response = {
      success: true,
      movies: filteredByGender,
    };
    res.json(response);
  }
  const response = {
    success: true,
    movies: movies,
  };
  res.json(response);
});
console.log('hoooolis');
server.post('/login', (req, res) => {
  console.log(req.body);
  const query = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?');
  const userLogin = query.get(req.body.email, req.body.password);
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
  const query = db.prepare(`SELECT * FROM movies WHERE id =?`);
  const movie = query.get(req.params.movieId);
  console.log(movie);
  res.render('movie', movie);
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
