import React from 'react';

const ModalForm = (props) => {
  const {
    onCloseModal,
    onTitleInput,
    onDescriptionInput,
    hasFile,
    onFileUpload,
    onFormSubmit
  } = props;

  const imgRef = React.createRef();

  const handleTitleInput = (e) => {
    onTitleInput(e.currentTarget.value)
  };

  const handleDescriptionInput = (e) => {
    onDescriptionInput(e.currentTarget.value)
  };

  const handleImgUpload = (e) => {
    const input = e.currentTarget;

    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        imgRef.current && imgRef.current.setAttribute('src', e.currentTarget.result);
        onFileUpload(input.files[0]);
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  return (
    <div className='modal'>
      <article className='modal__inner'>
        <button
          className='modal__close'
          onClick={onCloseModal}
        >
          <span>Close modal window</span>
          <svg className='icon'>
            <use xlinkHref="#icon-close" />
          </svg>
        </button>
        <h2 className='modal__title'>Add New</h2>
        <form
          action='/webinars'
          method='post'
          encType='multipart/form-data'
          onSubmit={onFormSubmit}
        >
          <p className='form-add__file'>
            <img
              className={hasFile ? 'js-shown' : ''}
              ref={imgRef}
            />
            <label htmlFor='form-add__file'>
              <input
                id='form-add__file'
                type='file'
                name='form-add__file'
                onChange={handleImgUpload}
              />
              <small>
                <svg className='icon'>
                  <use xlinkHref="#icon-copy" />
                </svg>
              </small>
              <span>select an image file to upload or drag it here</span>
            </label>
            <button type='button'>
              <svg className='icon'>
                <use xlinkHref="#icon-bin" />
              </svg>
            </button>
          </p>
          <div className='form-add__fieldset'>
            <label htmlFor='form-add__title'>Title</label>
            <input
              id='form-add__title'
              type='text'
              name='form-add__title'
              placeholder='Title'
              onInput={handleTitleInput}
            />
          </div>
          <div className='form-add__fieldset'>
            <label htmlFor='form-add__description'>Description</label>
            <textarea
              id='form-add__description'
              rows='3'
              placeholder='Description'
              onInput={handleDescriptionInput}
            />
          </div>
          <div className='form-add__fieldset'>
            <button className='button-primary button-primary--green' type='submit'>Save</button>
          </div>
        </form>
      </article>
    </div>
  );
};

ModalForm.defaultProps = {
  hasFile: false,
  onTitleInput: () => {},
  onDescriptionInput: () => {},
  onFileUpload: () => {},
  onFormSubmit: () => {},
  onCloseModal: () => {}
};

export { ModalForm };
