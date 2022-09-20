import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};
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
const Show = () => {
  const [state, dispatch] = useReducer(reduce, initialState);
  const { id } = useParams();
  // const [show, setShow] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  useEffect(() => {
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(result => {
        // setShow(result);
        // setIsLoading(false);
        dispatch({ type: 'FETCH_SUCCESSFUL', show: result });
      })
      .catch(err => {
        // setError(err.message);
        // setIsLoading(false);
        dispatch({ type: 'FETCH_UNSUCCESSFUL', error: err });
      });
  }, [id]);

  if (state.isLoading) {
    return <div>Data is loading </div>;
  }
  if (state.error) {
    return <div>Error occured {state.error}</div>;
  }

  return <div>{console.log('Show', state.show)}This is show page</div>;
};
export default Show;
