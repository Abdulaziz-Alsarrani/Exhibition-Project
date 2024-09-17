import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageCard from '../Image/ImageCard';
import AddModal from '../Image/AddModal';
import './ProfilePage.css';


function Profile() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/my_images`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          }
        });
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
            <ImageCard
              key={image._id}
              image_Id={image._id}
              imageSrc={image.imageUrl}
              title={image.title}
              description={image.description}
              initialLikes={image.likes}
            />
          ))
        ) : (
          <p>No images found</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
