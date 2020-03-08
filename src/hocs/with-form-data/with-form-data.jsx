import * as React from 'react';

const withFormData = (Component) => {
  class WithFormData extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        title: '',
        description: '',
        image: ''
      };

      this.handleTitleInput = this.handleTitleInput.bind(this);
      this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
      this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    handleTitleInput(val) {
      this.setState({
        title: val
      })
    }

    handleDescriptionInput(val) {
      this.setState({
        description: val
      })
    }

    handleFileUpload(val) {
      this.setState({
        image: val
      })
    }

    render() {
      return (
        <Component
          image={this.state.image}
          onTitleInput={this.handleTitleInput()}
          onDescriptionInput={this.handleDescriptionInput()}
          onFileUpload={this.handleFileUpload()}
        />
      );
    }
  }

  return WithFormData;
};

export default withFormData;
