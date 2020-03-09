import * as React from 'react';

const Hero = (props) => {
  const {onAddNewClick, withButton} = props;

  return (
    <section className='hero'>
      <div className='hero__inner'>
        <section className='hero__description'>
          <h1 className='hero__title'>Webinars</h1>
          <small className='hero__text'>Here you can register and take part in educational webinars conducted by the best digital marketing experts.</small>
          {withButton && <button
            className='button-primary'
            onClick={onAddNewClick}
          >
            Add new
          </button>}
        </section>
      </div>
    </section>
  );
};

Hero.defaultProps = {
  withButton: true,
  onAddNewClick: () => {}
};

export {Hero};
