import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './modal.css';

const Like = ({ imageId, initialLikes }) => {
    const { isLoggedIn } = useAuth();
    const [likes, setLikes] = useState(initialLikes || []);
    const [hasLiked, setHasLiked] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId  && likes.includes(userId)) {
            setHasLiked(true);
        }
        else {
            setHasLiked(false);
        }
    }, [userId, likes]);

    const handleLike = async () => {
        if (!isLoggedIn) {
            navigate('/login'); 
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL || window.location.origin}/api/images/${imageId}/like`,
                {}, 
                {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                });
            setLikes(response.data.totalLikes); 
            setHasLiked(!hasLiked); 
        } catch (error) {
            console.error('Error liking the image:', error);
        }
    };



    return (
        <div className="image-card__actions">
            {isLoggedIn ? (
                <button
                    className={`like-button ${hasLiked ? 'liked' : ''}`}
                    onClick={handleLike}
                >
                    {hasLiked ? 'Unlike' : 'Like'} {likes.length}
                </button>
            ) : (
                <button className="like-button" onClick={handleLike}>
                    Like {likes.length}
                </button>
            )}
        </div>
    );
};

export default Like;