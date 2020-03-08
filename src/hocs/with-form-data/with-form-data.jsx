import * as React from 'react';

const withFormData = (Component) => {
  class WithFormData extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        title: '',
        description: '',
        file: null
      };

      this.handleTitleInput = this.handleTitleInput.bind(this);
      this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
      this.handleFileUpload = this.handleFileUpload.bind(this);
      this.prepareData = this.prepareData.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.addNewWebinar = this.addNewWebinar.bind(this);
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

    handleFileUpload(file) {
      this.setState({
        file: file
      })
    }

    prepareData () {
      const formData = new FormData();
      Object.keys(this.state).forEach((key) => {
        formData.append(key, this.state[key]);
      });

      return formData;
    }

    handleFormSubmit(e) {
      e.preventDefault();

      const data = this.prepareData();

      axios.post('http://localhost:5000/uploads', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(() => {
          this.addNewWebinar();
        })
    };

    get fileName() {
      return this.state.file.name.split(' ').join('-');
    }

    addNewWebinar() {
      const model = {
        title: this.state.title,
        description: this.state.description,
        imgSrc: `uploads/${this.fileName}`,
        imgDescription: this.state.file.name,
        tag: '',
        grid: 1
      };

      this.props.onSaveNew(model);
    }

    render() {
      return (
        <Component
          {...this.props}
          hasFile={!!this.state.file}
          onTitleInput={this.handleTitleInput}
          onDescriptionInput={this.handleDescriptionInput}
          onFileUpload={this.handleFileUpload}
          onFormSubmit={this.handleFormSubmit}
        />
      );
    }
  }

  return WithFormData;
};

export default withFormData;
