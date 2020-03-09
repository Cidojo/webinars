import React from 'react';
import {connect} from 'react-redux';
import {RemoveScroll} from 'react-remove-scroll'
import {bindActionCreators} from 'redux';
import qs from 'qs';

import {ModalForm} from './../parts/modal-form.jsx';
import {WebinarCard} from './../parts/webinar-card.jsx';
import {Header} from './../parts/header.jsx';
import {Hero} from './../parts/hero.jsx';
import {Pagination} from './../parts/pagination.jsx';
import withActiveItem from './../../hocs/with-active-item/with-active-item.jsx';
import withFormData from './../../hocs/with-form-data/with-form-data.jsx';
import withPolyfills from './../../hocs/with-polyfills/with-polyfills.jsx';
import Selectors from './../../selectors/selectors.js';
import {GRID_LAYOUT} from './../../constants/constants';

import './../../assets/icons/icon-close.svg';
import './../../assets/icons/icon-copy.svg';
import './../../assets/icons/icon-bin.svg';

import {WebinarsOperation} from './../../reducers/webinars-reducer/webinars-reducer';

const ModalFormWrapped = withFormData(ModalForm);

const getGrid = () => {
  const TILE_COLUMNS = 3;
  const GRID_COLUMNS = 12;

  return GRID_LAYOUT
    .join(',')
    .split(',')
    .filter((cell) => cell > 0)
    .map((col) => `col-${Math.floor((GRID_COLUMNS / TILE_COLUMNS) * col)}`);
};

const gridSettings = getGrid();

const HomePage = (props) => {
  const {webinars, active, onActiveChange, onSaveNew} = props;

  const currentPage = +qs.parse(props.location.search, { ignoreQueryPrefix: true }).page || 1;

  const handleAddNewClick = () => {
    onActiveChange(true);
  };

  const handleCloseModal = () => {
    onActiveChange(null);
  };

  const handleSaveNew = (model) => {
    onSaveNew(model);
    handleCloseModal()
  };

  return (
    <>
      <Header />
      <Hero
        onAddNewClick={handleAddNewClick}
      />
      <section className="tiles">
        <div className='tiles__inner'>
          {webinars.slice((currentPage - 1) * gridSettings.length, currentPage * gridSettings.length).map((webinar, i) => {
            return (
              <WebinarCard
                key={`${webinar.id}_${i}`}
                webinar={webinar}
                gridClassName={gridSettings[i]}
              />
            );
          })}
        </div>
      </section>
      {webinars.length > gridSettings.length &&
        <Pagination
          pages={Math.ceil(webinars.length / gridSettings.length)}
          currentPage={currentPage}
        />
      }
      {active ?
        <RemoveScroll className={`modal-wrp ${RemoveScroll.classNames.noScrollbarsClassName}`}>
          <ModalFormWrapped
            onCloseModal={handleCloseModal}
            onSaveNew={handleSaveNew}
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

const HomePageWrapped = withPolyfills(withActiveItem(HomePage));

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
