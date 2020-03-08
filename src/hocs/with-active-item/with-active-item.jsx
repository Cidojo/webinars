import * as React from 'react';
import PropTypes from 'prop-types';

const withActiveItem = (Component, defaultActiveItem) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        active: defaultActiveItem || null
      };

      this.handleActiveChange = this.handleActiveChange.bind(this);
    }

    handleActiveChange(active) {
      this.setState({active});
    }

    render() {
      const {active} = this.state;

      return (
        <Component
          {...this.props}
          active={active}
          onActiveChange={this.handleActiveChange}
        />
      );
    }
  }

  WithActiveItem.propTypes = {
    onActiveChange: PropTypes.func
  };

  return WithActiveItem;
};

export default withActiveItem;
