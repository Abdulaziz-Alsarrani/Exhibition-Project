import React, { useState } from 'react';
import axios from 'axios';
import './modal.css'; 

const AddModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);


  if (!isOpen) return null;

  // Handle the image file selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!image) {
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image); 

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || window.location.origin}/api/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
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
        <h2>Upload Image</h2>
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
            <label>
              Image:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </label>
            <button type="submit">Upload Image</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
