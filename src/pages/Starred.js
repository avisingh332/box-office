import React, { useState, useEffect } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/shows/ShowGrid';
// import ShowGrid from '../components/shows/ShowGrid';
import { apiGet } from '../misc/config';
import { useShows } from '../misc/custom-hooks';
// import MainPageLayout from '../components/MainPageLayout';

const Starred = () => {
  // return <div>This is starred page</div>;
  const [starredShows] = useShows();

  // console.log('Ids of starred shows', starredShows);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (starredShows.length > 0 && starredShows) {
      const promises = starredShows.map(showId => apiGet(`/shows/${showId}`));
      Promise.all(promises)
        .then(apiData => apiData.map(show => ({ show })))
        .then(r => {
          setResult(r);
          setIsLoading(false);
        })
        .catch(err => {
          setIsError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starredShows]);
  return (
    <MainPageLayout>
      {/* {!isLoading && result === null && <div>No shows were Added</div>} */}
      {isLoading && <div>Shows are still loading</div>}
      {isError && <div>Error occured: {isError}</div>}
      {!isLoading && !result && <div>No shows were added</div>}
      {!isLoading && !isError && result && <ShowGrid data={result} />}
    </MainPageLayout>
  );
};

export default Starred;
