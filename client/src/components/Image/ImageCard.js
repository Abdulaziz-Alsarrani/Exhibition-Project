import React, { useState } from 'react';
import Modal from './Modal'; 
import './image.css'; 
import Like from './like';


const ImageCard = ({ image_Id, imageSrc, title, description, initialLikes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  return (
    <div>
      <div className="image-card" onClick={handleImageClick}>
        <img src={imageSrc} alt={title} className="image-card__img" />
      </div>

    
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageSrc={imageSrc}
        title={title}
        description={description}
      />
      <Like imageId={image_Id} initialLikes={initialLikes}  />
    </div>
  );
};

export default ImageCard;

