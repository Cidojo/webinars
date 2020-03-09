import React from 'react';

const ClassNames = {
  HIGHLIGHT: 'highlight',
  IMG_SHOWN: 'js-shown',
  INVALID_FIELD: 'js-invalid'
};

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
  const fileInputRef = React.createRef();

  const handleFormSubmit = (e) => {
     onFormSubmit(e);
  };

  const handleTitleInput = (e) => {
    onTitleInput(e.currentTarget.value)
  };

  const handleDescriptionInput = (e) => {
    onDescriptionInput(e.currentTarget.value)
  };

  const saveFile = (file) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      imgRef.current && imgRef.current.setAttribute('src', e.currentTarget.result);
      onFileUpload(file);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = () => {
    const input = fileInputRef.current;

    if (input && input.files.length) {
      saveFile(input.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    e.currentTarget.classList.remove(ClassNames.HIGHLIGHT);

    const dt = e.dataTransfer;
    const files = dt.files;

    if (files && files.length) {
      saveFile(files[0]);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    e.currentTarget.classList.add(ClassNames.HIGHLIGHT);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    e.currentTarget.classList.add(ClassNames.HIGHLIGHT);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    e.currentTarget.classList.remove(ClassNames.HIGHLIGHT);
  };

  const handleRemoveImg = () => {
    fileInputRef.current.value = '';
    imgRef.current && imgRef.current.removeAttribute('src');
    onFileUpload(null);
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
          onSubmit={handleFormSubmit}
        >
          <p
            className='form-add__file'
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <img
              className={hasFile ? ClassNames.IMG_SHOWN : ''}
              ref={imgRef}
            />
            <label htmlFor='form-add__file'>
              <input
                id='form-add__file'
                type='file'
                name='form-add__file'
                onChange={handleImageUpload}
                ref={fileInputRef}
                required
              />
              <small>
                <svg className='icon'>
                  <use xlinkHref="#icon-copy" />
                </svg>
              </small>
              <span>select an image file to upload or drag it here</span>
            </label>
            <button
              type='button'
              className={hasFile ? ClassNames.IMG_SHOWN: ''}
              onClick={handleRemoveImg}
            >
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
              required
            />
          </div>
          <div className='form-add__fieldset'>
            <label htmlFor='form-add__description'>Description</label>
            <textarea
              id='form-add__description'
              rows='3'
              placeholder='Description'
              onInput={handleDescriptionInput}
              required
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
