const INITIAL_STATE = {
  screenMovies: true,
  screenTv: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_SCREENMOVIES':
      return {...state, screenMovies: action.payload};

    case 'SET_SCREENTV':
      return {...state, screenTv: action.payload};

    default:
      return state;
  }
};
