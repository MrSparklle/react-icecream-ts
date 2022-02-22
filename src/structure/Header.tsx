import React from 'react';
import { NavLink } from 'react-router-dom';
import iceCreamImg from '../assets/img/ultimate-ice-cream.svg';

const Header = () => {
  return (
    <header>
      <img src={iceCreamImg} alt="" />
      <h1>React Ice Cream</h1>
      <nav>
        <NavLink to="/" state={{ focus: true }}>
          Menu
        </NavLink>
        <NavLink to="/ice-creams" state={{ focus: true }}>
          Add Ice Cream
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
