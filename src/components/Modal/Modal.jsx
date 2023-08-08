import { useEffect } from 'react';
import { ModalContainer, Overlay, Image } from './Modal.styled';

const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <Overlay onClick={handleBackdropClick}>
        <ModalContainer>
          <Image src={image} alt="ImageAlt" loading="lazy" />
        </ModalContainer>
      </Overlay>
    </>
  );
};

export default Modal;
