import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './modal.css';

const Delete = ({ imageId, isOpen, onClose }) => {
    if (!isOpen) return null;
    const token = localStorage.getItem('token');


    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL || window.location.origin}/api/images/${imageId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
        } catch (error) {
            console.log(error)
            console.error('Error Delete the image:', error);
        }
    };



    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="modal-close" onClick={onClose}>&times;</span>
                <div className="modal-details">
                    <h2>Do you want to delete the image?</h2>
                    <div className="image-card__actions">
                        <button className="delete" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Delete;