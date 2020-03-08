import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <header className='header'>
      <div className='header__inner'>
        <Link to='/'>
          <img className="header__logo" src='../../assets/img/logo.svg' alt='logo' />
        </Link>
      </div>
    </header>
  );
};

export {Header};
