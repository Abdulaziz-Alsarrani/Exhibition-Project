import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageCard from '../Image/ImageCard';

function Home() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const apiUrl = `${process.env.REACT_APP_API_URL || window.location.origin}/api/images`;
        console.log('API URL:', apiUrl);

        const response = await axios.get(apiUrl);
        console.log('API response:', response.data); 

        if (Array.isArray(response.data)) {
          const sortedImages = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setImages(sortedImages);
        } else {
          setError('Invalid API response format');
          console.error('Unexpected API response:', response.data);
        }

      } catch (err) {
        setError('Failed to load images');
        console.log(err);
        console.error('Error fetching images:', err);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="profile-page">
    <h2>Latest Image Uploaded</h2>
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
