const mongoose = require('mongoose');



const imageSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
    timestamps: true
});

const Model = mongoose.model('Image', imageSchema);

module.exports = Model;