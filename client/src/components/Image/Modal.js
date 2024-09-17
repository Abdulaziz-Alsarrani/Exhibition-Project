import React from 'react';
import './modal.css'; 

const Modal = ({ isOpen, onClose, imageSrc, title, description}) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose}>&times;</span>
        <img src={imageSrc} alt={title} className="modal-image" />
        <div className="modal-details">
          <h2>{title}</h2>
          <p>{description}</p> 
        </div>
      </div>
    </div>
  );
};

export default Modal;
