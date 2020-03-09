import * as React from 'react';
import objectFitImages from 'object-fit-images';

const withPolyfills = (Component) => {
  class WithPolyfills extends React.PureComponent {
    componentDidMount() {
      objectFitImages();
    }

    render() {
      return (
        <Component
          {...this.props}
        />
      );
    }
  }

  return WithPolyfills;
};

export default withPolyfills;
