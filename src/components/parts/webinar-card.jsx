import * as React from 'react';
import {Link} from 'react-router-dom';

const WebinarCard = (props) => {
  const {webinar, gridClassName} = props;

  return (
    <article
      className={`tile ${gridClassName}`}
    >
      <Link to={`/webinars/${webinar.id}`}>
        <div className='tile__img-wrp'>
          <img src={webinar.imgSrc} alt={webinar.imgDescription} />
        </div>
        <div className='tile__content'>
          <h3>{webinar.title}</h3>
          <p>{webinar.description}</p>
          {webinar.tag ? <span>{webinar.tag}</span> : ''}
        </div>
      </Link>
    </article>
  );
};

WebinarCard.defaultProps = {
  webinar: {
    id: 0,
    title: '',
    description: '',
    imgSrc: '',
    imgDescription: '',
    tag: '',
    grid: 1
  },
  gridClassName: ''
};

export {WebinarCard};
