import { useState } from 'react';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  const modalStyle = {
    display: isOpen ? 'block' : 'none',
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
        ></div>
      )}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 rounded-default"
        style={modalStyle}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
