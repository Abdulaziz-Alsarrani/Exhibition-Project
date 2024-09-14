const express = require('express');
const router = express.Router();
const controller = require('../controllers/imageController')
const auth = require('../middlewares/auth')
const upload = require('../middlewares/upload')
const Image = require("../models/image")

router.post('/upload', auth.check, upload.single('image'), controller.upload_image)
router.get('/images', controller.get_all_images)
router.get('/my_images', auth.check, controller.get_my_images)
router.put('/images/:imageId', auth.check, controller.update_image);
router.delete('/images/:imageId', auth.check, controller.delete_image);

router.post('/images/:id/like', auth.check, controller.like_images);


module.exports = router;    