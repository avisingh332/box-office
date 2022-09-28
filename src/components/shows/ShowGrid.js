import React from 'react';
import ShowCard from './ShowCard';
import IMG_NOT_FOUND from '../../images/not-found.png';
import { usePersistenceReducer } from '../../misc/custom-hooks';
import { FlexGrid } from '../styled';
const ShowGrid = ({ data }) => {
  const [starredState, dispatch] = usePersistenceReducer();
  return (
    <FlexGrid>
      {data.map(({ show }) => {
        const isStarred = starredState.includes(show.id);
        const onStarClick = () => {
          if (isStarred) {
            dispatch({ type: 'REMOVE', showId: show.id });
          } else {
            dispatch({ type: 'ADD', showId: show.id });
          }
        };
        return (
          <ShowCard
            key={show.id}
            name={show.name}
            id={show.id}
            image={show.image ? show.image.medium : IMG_NOT_FOUND}
            summary={show.summary}
            onStarClick={onStarClick}
            isStarred={isStarred}
          />
        );
      })}
    </FlexGrid>
  );
};

export default ShowGrid;
