import React from 'react';
import ShowCard from './ShowCard';
import IMG_NOT_FOUND from '../../images/not-found.png';
import { FlexGrid } from '../styled';
const ShowGrid = ({ data }) => {
  return (
    <FlexGrid>
      {data.map(({ show }) => {
        return (
          <ShowCard
            key={show.id}
            name={show.name}
            id={show.id}
            image={show.image ? show.image.medium : IMG_NOT_FOUND}
            summary={show.summary}
          />
        );
      })}
    </FlexGrid>
  );
};

export default ShowGrid;
