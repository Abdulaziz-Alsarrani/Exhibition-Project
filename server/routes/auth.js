const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController')
const auth = require('../middlewares/auth')
const {  userValidatorRules, validate } = require('../middlewares/validator');

router.post('/login' , controller.login)
router.post('/register' , userValidatorRules(),validate,  controller.register)
router.get('/me' ,auth.check,  controller.me)

module.exports = router;