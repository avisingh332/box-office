import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
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
  const setPersistedInput = useCallback(
    newInput => {
      setInput(newInput);
      sessionStorage.setItem(key, JSON.stringify(newInput));
    },
    [key]
  );
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
export function useWhyDidYouUpdate(name, props) {
  // Get a mutable ref object where we can store props ...
  // ... for comparison next time this hook runs.
  const previousProps = useRef();
  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj = {};
      // Iterate through keys
      allKeys.forEach(key => {
        // If previous is different from current
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });
      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj);
      }
    }
    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
}
