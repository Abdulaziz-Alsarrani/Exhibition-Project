import React, { useState } from 'react';
import axios from 'axios';
import './modal.css'; 

const UpdateModal = ({imageId, isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  if (!isOpen) return null;


 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL || window.location.origin}/api/images/${imageId}`,
        {title, description},
        {
          headers: {
           'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onClose(); 
    } catch (error) {
      console.error('Error uploading the image:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose}>&times;</span>
        <div className="modal-details">
        <h2>Update</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
            <button type="submit">save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
