/* eslint no-underscore-dangle: 0 */
import React from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../components/shows/Cast';
import Details from '../components/shows/Details';
import Seasons from '../components/shows/Seasons';
import ShowMainData from '../components/shows/ShowMainData';
// import { apiGet } from '../misc/config';
import { ShowDetails } from '../misc/custom-hooks';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

const Show = () => {
  const { id } = useParams();
  const { show, isLoading, error } = ShowDetails(id);
  // console.log('Loading: ', isLoading);

  // const show = testObj.show;
  // const isLoading = testObj.isLoading;
  // const error = testObj.error;

  // const [show, setShow] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  if (isLoading) {
    return <div>Data is loading </div>;
  }
  if (error) {
    return <div>Error occured {error}</div>;
  }

  return (
    <ShowPageWrapper>
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
