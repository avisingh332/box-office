import React from 'react';
import ActorCard from './ActorCard';
import IMG_NOT_FOUND from '../../images/not-found.png';
import { FlexGrid } from '../styled';
const ActorGrid = ({ data }) => {
  return (
    <FlexGrid>
      {data.map(({ person }) => {
        return (
          <ActorCard
            key={person.id}
            id={person.id}
            name={person.name}
            country={person.country}
            birthday={person.birthday}
            deathday={person.deathday}
            image={person.image ? person.image.medium : IMG_NOT_FOUND}
            gender={person.gender}
          />
        );
      })}
    </FlexGrid>
  );
};

export default ActorGrid;
