import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageCard from '../Image/ImageCard';
import AddModal from '../Image/AddModal';
import './ProfilePage.css';
import UpdateModal from '../Image/UpdateModal';
import Delete from '../Image/Delete';

function Profile() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatingImageId, setUpdatingImageId] = useState(null);
  const [deleteImageId, setDeleteImageId] = useState(null);

  const handleImageClick = () => {
    setIsModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };


  const handleUpdateClick = (imageId) => {
    setUpdatingImageId(imageId); 
  };


  const handleCloseUpdateModal = () => {
    setUpdatingImageId(null); 
  };

  const handleDeleteClick = (imageId) => {
    setDeleteImageId(imageId); 
  };


  const handleCloseDeleteModal = () => {
    setDeleteImageId(null); 
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || window.location.origin}/api/my_images`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Full API response:', response);
        const sortedImages = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setImages(sortedImages);
      } catch (err) {
        setError('Failed to load images');
        console.error('Error fetching images:', err);
      }
    };

    fetchImages();
  }, [images]);

  return (
    <div className="profile-page">
      <h2>My Uploaded Images</h2>
      {error && <p>{error}</p>}
      <button className="add-button" onClick={handleImageClick}>Add Image</button>
      <AddModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <div className="image-gallery">
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image._id} >
              <ImageCard
                image_Id={image._id}
                imageSrc={image.imageUrl}
                title={image.title}
                description={image.description}
                initialLikes={image.likes}
              />  
              <button className="update-button" onClick={() => handleUpdateClick(image._id)}>Update</button>
              <button className="delete-button" onClick={() => handleDeleteClick(image._id)}>Delete</button>
              {updatingImageId === image._id && (
                <UpdateModal
                  imageId={image._id}
                  isOpen={updatingImageId === image._id}
                  onClose={handleCloseUpdateModal}
                />
              )}
              <Delete imageId={image._id}
               isOpen={deleteImageId === image._id}
               onClose={handleCloseDeleteModal}
               />
            </div>

          ))
        ) : (
          <p>No images found</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
