import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalImage } from './Modal.styled';
import PropTypes from 'prop-types';

const rootModal = document.querySelector('#root-modal');

export default function Modal({ image, closeModal }) {
  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const handleEscape = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdrop}>
      <ModalImage src={image} alt="велике зображення" />
    </Overlay>,
    rootModal
  );
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
