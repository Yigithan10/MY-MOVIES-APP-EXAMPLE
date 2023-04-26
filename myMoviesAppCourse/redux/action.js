export const SetScreenMovies = screenMovies => {
  return {
    type: 'SET_SCREENMOVIES',
    payload: screenMovies,
  };
};

export const SetScreenTv = screenTv => {
  return {
    type: 'SET_SCREENTV',
    payload: screenTv,
  };
};
