import * as React from 'react';

const TILE_COLUMNS = 3;
const GRID_COLUMNS = 12;

const WebinarCard = (props) => {
  const {webinar} = props;

  return (
    <article
      className={`tile${ webinar.grid > 1 ? ` col-${parseInt((GRID_COLUMNS / TILE_COLUMNS) * webinar.grid)}` : ''}`}
    >
      <div className='tile__img-wrp'>
        <img src={webinar.imgSrc} alt={webinar.imgDescription} />
      </div>
      <div className='tile__content'>
        <h3>{webinar.title}</h3>
        <p>{webinar.description}</p>
        {webinar.tag ? <span>{webinar.tag}</span> : ''}
      </div>
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
  }
};

export {WebinarCard};
