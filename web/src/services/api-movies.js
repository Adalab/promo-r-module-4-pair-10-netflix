// login

const getMoviesFromApi = (params) => {
  console.log('Se están pidiendo las películas de la app');
  console.log(params);
  return fetch(
    `//localhost:4000/movies?gender=${params.gender}&sort=${params.sort}`,
    {
      method: 'GET',
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;
