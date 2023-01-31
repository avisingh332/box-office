/* eslint no-underscore-dangle: 0 */
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../components/shows/Cast';
import Details from '../components/shows/Details';
import Seasons from '../components/shows/Seasons';
import ShowMainData from '../components/shows/ShowMainData';
import { apiGet } from '../misc/config';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

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
  const [{ show, isLoading, error }, dispatch] = useReducer(
    reduce,
    initialState
  );
  // const dataOfParam = useParams();
  const { id } = useParams();
  // const [show, setShow] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  useEffect(() => {
    // console.log('id is ', id);
    // console.log('Data is ', dataOfParam);
    // https://api.tvmaze.com/shows/1?embed[]=episodes&embed[]=cast
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

  if (isLoading) {
    return <div>Data is loading </div>;
  }
  if (error) {
    return <div>Error occured {error}</div>;
  }

  return (
    <ShowPageWrapper>
      {console.log(show)}
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />
      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          premiered={show.premiered}
          network={show.network}
        />
      </InfoBlock>

      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>

      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};
export default Show;
