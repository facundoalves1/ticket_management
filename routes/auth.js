const express = require('express');
const router = express.Router();
const {createUser, loginUser} = require('../controllers/auth');
const {registerValidator, loginValidator} = require('../validators/auth');

router.post('/createUser', registerValidator, createUser);

router.post('/login', loginValidator, loginUser);

module.exports = router;