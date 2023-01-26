import { useEffect, useReducer } from 'react';
function reduce(prevState, action) {
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
export function usePersistenceReducer(key = 'shows') {
  const [state, dispatch] = useReducer(reduce, [], initial => {
    const persisted = localStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : initial;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);
  return [state, dispatch];
}
