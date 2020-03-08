import * as React from 'react';

const Pagination = (props) => {
  return (
    <div className='pagination'>
      <ul>
        <li className='pagination__item pagination__item--active'>
          <a href='#'>1</a>
        </li>
        <li className='pagination__item'>
          <a href='#'>2</a>
        </li>
        <li className='pagination__item'>
          <a href='#'>3</a>
        </li>
        <li className='pagination__item'>
          <a href='#'>4</a>
        </li>
      </ul>
    </div>
  );
};

export {Pagination};
