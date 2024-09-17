import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageCard from '../Image/ImageCard';

function Home() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/images`);
        const sortedImages = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setImages(response.data);
      } catch (err) {
        setError('Failed to load images');
        console.error('Error fetching images:', err);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="profile-page">
    <h2>Recently Uploaded</h2>
    {error && <p>{error}</p>}
    <div className="image-gallery">
      {images.length > 0 ? (
        images.map((image) => (
          <ImageCard
            key={image._id}
            imageSrc={image.imageUrl}
            title={image.title}
            description={image.description}
            image_Id={image._id}
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

export default Home;
