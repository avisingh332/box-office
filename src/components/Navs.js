import React from 'react';
import { useLocation } from 'react-router';
// import { Link } from 'react-router-dom';
import { LinkStyled, NavList } from './Navs.styled';
const LINKS = [
  { to: '/home', text: 'Home' },
  { to: '/starred', text: 'Starred' },
];

const Navs = () => {
  const location = useLocation();
  return (
    <div>
      <NavList>
        {LINKS.map(items => (
          <li key={items.to}>
            <LinkStyled
              className={items.to === location.pathname ? 'active' : ''}
              to={items.to}
            >
              {items.text}
            </LinkStyled>
          </li>
        ))}
      </NavList>
    </div>
  );
};

export default Navs;
