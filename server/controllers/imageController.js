const Image = require("../models/image")
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

exports.upload_image = async (req, res) => {
  console.log('File details:', req.file); // Debugging line
  console.log('Body details:', req.body);
  const { title, description } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'Image file is required' });
  }

  // Save relative path, excluding the system-specific full path
  const imagePath = `uploads/${req.file.filename}`;
  const newImage = new Image({
    title,
    description,
    imageUrl: imagePath,
    userId: req.userId // The user who uploaded the image
  });

  try {
    await newImage.save();
    res.status(201).json({ message: 'Image uploaded successfully', imageUrl: newImage.imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save image' });
  }
};

exports.update_image = async (req, res) => {
  const { imageId } = req.params; // Get the image ID from request parameters
  const { title, description } = req.body;

  try {
    // Find the image by ID
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Check if the user is the owner of the image
    if (image.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized to update this image' });
    }

    // Update the image details
    await Image.updateOne(
      { _id: imageId },
      {
        $set: {
          title: title || image.title,
          description: description || image.description
        }
      }
    );

    // Optionally, fetch the updated image to return it
    //const updatedImage = await Image.findById(imageId);

    res.status(200).json({
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update image' });
  }
};

exports.delete_image = async (req, res) => {
  const { imageId } = req.params; // Get the image ID from request parameters

  try {
    // Validate that imageId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(imageId)) {
      return res.status(400).json({ error: 'Invalid image ID' });
    }

    // Find the image by ID
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Check if the user is the owner of the image
    if (image.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized to delete this image' });
    }

    // Delete the image
    await Image.deleteOne({ _id: imageId });

    const filePath = path.join(__dirname, '../uploads', path.basename(image.imageUrl));
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Failed to delete file:', err);
      }
    });


    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};


exports.get_all_images = async (req, res) => {
  try {
    const images = await Image.find();
    // Format the imageUrl to be accessible from the client side
    const formattedImages = images.map(image => ({
      ...image._doc, // Get all other fields
      imageUrl: `${req.protocol}://${req.get('host')}/${image.imageUrl}` // Convert to full URL
    }));
    res.status(200).json(formattedImages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};

exports.get_my_images = async (req, res) => {
  const userId = req.userId; // Get userId from req.userId set by auth.check

  try {
    const images = await Image.find({ userId }); // Find images where userId matches
    const formattedImages = images.map(image => ({
      ...image._doc,
      imageUrl: `${req.protocol}://${req.get('host')}/${image.imageUrl}` // Build full URL
    }));
    res.status(200).json(formattedImages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};

exports.like_images = async (req, res) => {
  const imageId = req.params.id;
  const userId = req.userId;

  try {
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const hasLiked = image.likes.includes(userId);

    if (hasLiked) {
      // If user already liked the image, remove the like
      image.likes.pull(userId);
    } else {
      // Otherwise, add the user to the likes array
      image.likes.push(userId);
    }

    await image.save();
    res.json({ message: hasLiked ? 'Unliked' : 'Liked', totalLikes: image.likes.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to like/unlike image' });
  }
};