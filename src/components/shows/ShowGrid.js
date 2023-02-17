import React, { memo, useCallback } from 'react';
import ShowCard from './ShowCard';
import IMG_NOT_FOUND from '../../images/not-found.png';
import { useShows } from '../../misc/custom-hooks';
import { FlexGrid } from '../styled';

const ShowGrid = ({ data }) => {
  // console.log('in Show Grid');
  const [starredState, dispatch] = useShows();
  // console.log('Result:  ', starredState);
  return (
    <FlexGrid>
      {data.map(({ show }) => {
        const isStarred = starredState.includes(show.id);

        const onStarClick = useCallback(() => {
          if (isStarred) {
            dispatch({ type: 'REMOVE', showId: show.id });
          } else {
            dispatch({ type: 'ADD', showId: show.id });
          }
        }, [isStarred, show.id]);

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

export default memo(ShowGrid);
