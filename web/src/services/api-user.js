// login

const sendLoginToApi = (data) => {
  console.log('Se están enviando datos al login:', data);
  return fetch('//localhost:4000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((user) => {
      console.log('usuario conectado', user);
      return user;
    });
};

// signup

const sendSingUpToApi = (data) => {
  console.log('Se están enviando datos al signup:', data);
  return fetch('//localhost:4000/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

// profile

const sendProfileToApi = (userId, data) => {
  console.log('Se están enviando datos al profile:', userId, data);
  return fetch('//localhost:4000/user/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'user-id': userId,
    },
    body: JSON.stringify(data),
  });
};

const getProfileFromApi = (userId) => {
  console.log('Se están pidiendo datos del profile del usuario:', userId);
  return fetch('//localhost:4000/user/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'user-id': userId,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('console de perfil', data)
      return data
    });
};

// user movies
const getUserMoviesFromApi = (userId) => {
  console.log(
    'Se están pidiendo datos de las películas de la usuaria:',
    userId
  );

  return fetch('//localhost:4000/user/movies', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'user-id': userId,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
const sendUserMoviesFromApi = (movieId, userId) => {
  console.log(
    'Se están enviando datos de las películas de la usuaria:',
    userId
  );

  return fetch('//localhost:4000/user/movies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'user-id': userId,
    },
    body: JSON.stringify(movieId),
  })
};


const objToExport = {
  sendLoginToApi: sendLoginToApi,
  sendSingUpToApi: sendSingUpToApi,
  sendProfileToApi: sendProfileToApi,
  getProfileFromApi: getProfileFromApi,
  getUserMoviesFromApi: getUserMoviesFromApi,
  sendUserMoviesFromApi: sendUserMoviesFromApi
};

export default objToExport;
