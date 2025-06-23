const express = require('express');
const {logIn, signUp} = require ('../controllers/authController');
const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);

module.exports = router;