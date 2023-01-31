import { useEffect, useReducer } from 'react';

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
