import React from 'react';
import Navs from './Navs';
import Title from './Title';
const MainPageLayout = ({ children }) => {
  return (
    <div>
      <Title title="Box Office" subtitle="This is a box office application" />
      <Navs />
      {children}
    </div>
  );
};

export default MainPageLayout;
