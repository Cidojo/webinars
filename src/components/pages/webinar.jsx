import React from 'react';
import {connect} from 'react-redux';

import {WebinarCard} from './../parts/webinar-card.jsx';
import {Header} from './../parts/header.jsx';
import {Hero} from './../parts/hero.jsx';
import Selectors from './../../selectors/selectors.js';

const WebinarPage = (props) => {
  const {webinars, onActiveChange, onSaveNew} = props;

  const handleAddNewClick = () => {
    onActiveChange(true);
  };

  return (
    <>
      <Header />
      <Hero
        withButton={false}
        onAddNewClick={handleAddNewClick}
      />
      <section className="tiles">
        <div className='tiles__inner'>
          <WebinarCard
            webinar={webinars.find((webinar) => webinar.id === +props.match.params.id)}
            gridClassName='single'
          />
        </div>
      </section>
    </>
  );
};

WebinarPage.defaultProps = {
  webinars: []
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    webinars: Selectors.getWebinars(state)
  });
};

export {WebinarPage};
export default connect(mapStateToProps)(WebinarPage);
