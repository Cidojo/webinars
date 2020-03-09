import React from 'react';

import {Header} from './../parts/header.jsx';
import {Hero} from './../parts/hero.jsx';

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <Hero
        withButton={false}
      />
      <section className="tiles">
        <div className='tiles__inner'>
          <h1>PAGE NOT FOUND</h1>
        </div>
      </section>
    </>
  );
};

export {NotFoundPage};
