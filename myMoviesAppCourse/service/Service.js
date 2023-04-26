import axios from 'axios';

// Get popular movies
export const getPopularMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/movie/popular?api_key=<yourapikey>&language=en-US&page=1',
  );
  return response.data.results;
};

// Get upcoming movies
export const getUpcomingMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/movie/upcoming?api_key=<yourapikey>&language=en-US&page=1',
  );
  return response.data.results;
};

// Get popular tv
export const getPopularTv = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/tv/popular?api_key=<yourapikey>&language=en-US&page=1',
  );
  return response.data.results;
};

// Get family movies
export const getFamilyMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/discover/movie?api_key=<yourapikey>&language=en-US&page=1&with_genres=10751',
  );
  return response.data.results;
};

// Get comedy movies
export const getComedyMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/discover/movie?api_key=<yourapikey>&language=en-US&page=1&with_genres=35',
  );
  return response.data.results;
};

// Get romance movies
export const getRomanceMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/discover/movie?api_key=<yourapikey>&language=en-US&page=1&with_genres=10749',
  );
  return response.data.results;
};

// Get fantasy movies
export const getFantasyMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/discover/movie?api_key=<yourapikey>&language=en-US&page=1&with_genres=14',
  );
  return response.data.results;
};

// Get documentary movies
export const getDocumentaryMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/discover/movie?api_key=<yourapikey>&language=en-US&page=1&with_genres=99',
  );
  return response.data.results;
};

// Get crime movies
export const getCrimeMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/discover/movie?api_key=<yourapikey>&language=en-US&page=1&with_genres=80',
  );
  return response.data.results;
};

// Get drama movies
export const getDramaMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/discover/movie?api_key=<yourapikey>&language=en-US&page=1&with_genres=18',
  );
  return response.data.results;
};

// Get war movies
export const getWarMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/discover/movie?api_key=<yourapikey>&language=en-US&page=1&with_genres=10752',
  );
  return response.data.results;
};

// Get music movies
export const getMusicMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/discover/movie?api_key=<yourapikey>&language=en-US&page=1&with_genres=10402',
  );
  return response.data.results;
};

// Get family tv
export const getFamilyTv = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/discover/tv?api_key=<yourapikey>&language=en-US&page=1&with_genres=10751',
  );
  return response.data.results;
};

// Get comedy tv
export const getComedyTv = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/discover/tv?api_key=<yourapikey>&language=en-US&page=1&with_genres=35',
  );
  return response.data.results;
};

// Get talk tv
export const getTalkTv = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/discover/tv?api_key=<yourapikey>&language=en-US&page=1&with_genres=10767',
  );
  return response.data.results;
};

// Get fantasy tv
export const getFantasyTv = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/discover/tv?api_key=<yourapikey>&language=en-US&page=1&with_genres=10765',
  );
  return response.data.results;
};

// Get documantary tv
export const getDocumantaryTv = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/discover/tv?api_key=<yourapikey>&language=en-US&page=1&with_genres=99',
  );
  return response.data.results;
};

// Get crime tv
export const getCrimeTv = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/discover/tv?api_key=<yourapikey>&language=en-US&page=1&with_genres=80',
  );
  return response.data.results;
};

// Get drama tv
export const getDramaTv = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/discover/tv?api_key=<yourapikey>&language=en-US&page=1&with_genres=18',
  );
  return response.data.results;
};

// Get war tv
export const getWarTv = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/discover/tv?api_key=<yourapikey>&language=en-US&page=1&with_genres=10768',
  );
  return response.data.results;
};

// Get news tv
export const getNewsTv = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/discover/tv?api_key=<yourapikey>&language=en-US&page=1&with_genres=10763',
  );
  return response.data.results;
};

// Get one movie
export const getOneMovie = async (id, title) => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/'+title+'/'+id+'?api_key=<yourapikey>',
  );
  return response.data;
};

// Get search movie or tv
export const getSearchMovieTv = async (query, type) => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/search/'+type+'?api_key=<yourapikey>&query='+query,
  );
  return response.data.results;
};

// Get one video
export const getOneVideo = async (id, title) => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/'+title+'/'+id+'/videos?api_key=<yourapikey>&language=en-US',
  );
  return response.data.results;
};