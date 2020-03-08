import React from 'react';
import {connect} from 'react-redux';
import {RemoveScroll} from 'react-remove-scroll'
import {bindActionCreators} from 'redux';

import {ModalForm} from './../parts/modal-form.jsx';
import {WebinarCard} from './../parts/webinar-card.jsx';
import {Header} from './../parts/header.jsx';
import {Hero} from './../parts/hero.jsx';
import {Pagination} from './../parts/pagination.jsx';
import withActiveItem from './../../hocs/with-active-item/with-active-item.jsx';
import withFormData from './../../hocs/with-form-data/with-form-data.jsx';
import Selectors from './../../selectors/selectors.js';

import './../../assets/icons/icon-close.svg';
import './../../assets/icons/icon-copy.svg';
import './../../assets/icons/icon-bin.svg';
import {WebinarsOperation} from "../../reducers/webinars-reducer/webinars-reducer";

const ModalFormWrapped = withFormData(ModalForm);

const HomePage = (props) => {
  const {webinars, active, onActiveChange, onSaveNew} = props;

  const handleAddNewClick = () => {
    onActiveChange(true);
  };

  const handleCloseModal = () => {
    onActiveChange(null);
  };

  return (
    <>
      <Header />
      <Hero
        onAddNewClick={handleAddNewClick}
      />
      <section className="tiles">
        <div className='tiles__inner'>
          {webinars.map((webinar, i) => {
            return (
              <WebinarCard
                key={`${webinar.id}_${i}`}
                webinar={webinar}
              />
            );
          })}
        </div>
      </section>
      <Pagination />
      {active ?
        <RemoveScroll className={`modal-wrp ${RemoveScroll.classNames.noScrollbarsClassName}`}>
          <ModalFormWrapped
            onCloseModal={handleCloseModal}
            onSaveNew={onSaveNew}
          />
        </RemoveScroll>
      : ''}
    </>
  );
};

HomePage.defaultProps = {
  onActiveChange: () => {},
  onSaveNew: () => {},
  active: null,
  webinars: []
};

const HomePageWrapped = withActiveItem(HomePage);

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    webinars: Selectors.getWebinars(state)
  });
};

const mapDispatchToProps = (dispatch) => ({
  onSaveNew: bindActionCreators(WebinarsOperation.saveNew, dispatch)
});

export {HomePage};
export default connect(mapStateToProps, mapDispatchToProps)(HomePageWrapped);
