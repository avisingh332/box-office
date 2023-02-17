import React, { memo } from 'react';
import { TitleWrapper } from './Title.styled';

const Title = () => {
  // console.log('Rendered');
  return (
    <TitleWrapper>
      <h1>Box Office</h1>
      <p>This is a Box Office Application </p>
    </TitleWrapper>
  );
};

export default memo(Title);
