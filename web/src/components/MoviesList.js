import React from 'react';

const MoviesList = props => {
  const clickHandler = (ev) => {
    const movieId = ev.target.id;
    props.sendFavoritesToApi(movieId)
  }
  const renderMovieList = () => {
    return <ul className="cards">{renderMovies()}</ul>;
  };

  const renderMovies = () => {
    return props.movies.map(movie => {
      //debugger;
      return (
        <li key={movie.id} className="card">
          <img className="card__img" src={movie.image} alt={`Carátula de ${movie.title}`} />
          <h3 className="card__title">{movie.title}</h3>
          <p className="card__description">Género: {movie.gender}</p>
          <i className="fa-regular fa-heart" id={movie.id} onClick={clickHandler}></i>
        </li>
      );
      // if (props.userMovies.find(userMovie => movie.id === userMovie.id)) {
      //   return (
      //     <li key={movie.id} className="card">
      //       <img className="card__img" src={movie.image} alt={`Carátula de ${movie.title}`} />
      //       <h3 className="card__title">{movie.title}</h3>
      //       <p className="card__description">Género: {movie.gender}</p>
      //       <i className="fa-solid fa-heart"></i>
      //     </li>
      //   )
      // } else {
      //   return (
      //     <li key={movie.id} className="card">
      //       <img className="card__img" src={movie.image} alt={`Carátula de ${movie.title}`} />
      //       <h3 className="card__title">{movie.title}</h3>
      //       <p className="card__description">Género: {movie.gender}</p>
      //       <i class="fa-regular fa-heart"></i>
      //     </li>
      //   );
      // }
    });
  };

  const renderEmptyList = () => {
    return <p>No hay películas en este listado</p>;
  };

  return props.movies.length ? renderMovieList() : renderEmptyList();
};

export default MoviesList;
