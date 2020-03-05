import React from 'react';

const TILE_COLUMNS = 3;
const GRID_COLUMNS = 12;

const HomePage = (props) => {
  const {articles} = props;
  return (
    <>
      <header className='header'>
        <div className='header__inner'>
          <img className="header__logo" src='../../assets/img/logo.svg' alt='logo' />
        </div>
      </header>
      <section className='hero'>
        <div className='hero__inner'>
          <section className='hero__description'>
            <h1 className='hero__title'>Webinars</h1>
            <small className='hero__text'>Here you can register and take part in educational webinars conducted by the best digital marketing experts.</small>
            <button className='button-primary'>Add new</button>
          </section>
        </div>
      </section>
      <section className="tiles">
        <div className='tiles__inner'>
          {articles.map((article, i) => {
            return (
              <article
                className={`tile${ article.grid > 1 ? ` col-${parseInt((GRID_COLUMNS / TILE_COLUMNS) * article.grid)}` : ''}`}
                key={`${article.id}_${i}`}
              >
                <div className='tile__img-wrp'>
                  <img src={article.imgSrc} alt={article.imgDescription} />
                </div>
                <div className='tile__content'>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  {article.tag ? <span>{article.tag}</span> : ''}
                </div>
              </article>
            )
          })}
        </div>
      </section>
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

      <div className='modal'>
        <article className='modal__inner'>
          <button className='modal__close'>
            <span>Close modal window</span>
          </button>
          <h2 className='modal__title'>Add New</h2>
          <form action='add-new'>
            <p className='form-add__file'>
              <input type='file' name='form-add__file' />
            </p>
            <div className='form-add__fieldset'>
              <label htmlFor='form-add__title'>Title</label>
              <input id='form-add__title' type='text' name='form-add__title' placeholder='Title' />
            </div>
            <div className='form-add__fieldset'>
              <label htmlFor='form-add__description'>Description</label>
              <textarea id='form-add__description' rows='3' placeholder='Description'></textarea>
            </div>
            <div className='form-add__fieldset'>
              <button className='button-primary button-primary--green' type='submit'>Save</button>
            </div>
          </form>
        </article>
      </div>
    </>
  );
};

export {HomePage};
