import { useEffect, useReducer, useState } from 'react';

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

//  his cutom hook is for modifying the useState hook we wanted the input query string to persist in the session storage so
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
