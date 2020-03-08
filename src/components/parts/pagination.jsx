import * as React from 'react';
import {Link} from 'react-router-dom';

const Pagination = (props) => {
  const {pages, currentPage} = props;

  return (
    <div className='pagination'>
      <ul>
        {[...Array(pages)].map((page, i) => (
          <li
            key={i}
            className={currentPage === i + 1 ? `pagination__item pagination__item--active` : 'pagination__item'}
          >
            <Link to={`/?page=${i + 1}`}>{i + 1}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export {Pagination};
