import React from 'react';
import '../style/liste.css'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overla">
      <div className="modal-conten">
        {children}
      </div>
    </div>
  );
};

export default Modal;
