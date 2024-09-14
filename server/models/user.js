const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        maxlength: 50
    },
    email: {
        type:String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required:true,
        minlength: 6
    },
}, {
    timestamps: true
})

const Model = mongoose.model('User', ModelSchema)

module.exports = Model;