import { useEffect, useReducer, useState } from 'react';
import { apiGet } from './config';
function showReduce(prevState, action) {
  switch (action.type) {
    case 'ADD': {
      return [...prevState, action.showId];
    }
    case 'REMOVE': {
      return prevState.filter(id => {
        return id !== action.showId;
      });
    }
    default:
      return prevState;
  }
}

function usePersistenceReducer(reducer, key) {
  const [state, dispatch] = useReducer(reducer, [], initial => {
    const persisted = localStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : initial;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);
  return [state, dispatch];
}

export function useShows() {
  return usePersistenceReducer(showReduce, 'shows');
}

//  This cutom hook is for modifying the useState hook we wanted the input query string to persist in the session storage so
export function useLastQuery(key = 'lastQuery') {
  const [input, setInput] = useState(() => {
    const persisted = sessionStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : '';
  });
  //  this the custom function for setting the input because setInput will just set the input value but
  //  wouldn't update it in the sessions storages
  const setPersistedInput = newInput => {
    setInput(newInput);
    sessionStorage.setItem(key, JSON.stringify(newInput));
  };
  return [input, setPersistedInput];
}

function reduce(prevState, action) {
  switch (action.type) {
    case 'FETCH_SUCCESSFUL':
      return { ...prevState, isLoading: false, show: action.show };
    case 'FETCH_UNSUCCESSFUL':
      return { ...prevState, isLoading: false, error: action.error };
    default:
      return prevState;
  }
}
//  this custom hook is use for maintaining the states of the show.js which are isLoading , error and show
export function ShowDetails(showId) {
  const [state, dispatch] = useReducer(reduce, {
    show: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // https://api.tvmaze.com/shows/1?embed[]=episodes&embed[]=cast
    apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
      .then(result => {
        // setShow(result);
        // setIsLoading(false);
        // console.log('Result', result);
        dispatch({ type: 'FETCH_SUCCESSFUL', show: result });
      })
      .catch(err => {
        // setError(err.message);
        // setIsLoading(false);
        // console.log('Error', err);
        dispatch({ type: 'FETCH_UNSUCCESSFUL', error: err });
      });
  }, [showId]);

  return state;
}
