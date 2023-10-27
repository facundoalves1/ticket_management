const express = require('express');
const router = express.Router();
const {createUser, loginUser} = require('../controllers/auth');
const {registerValidator, loginValidator} = require('../validators/auth');
const {verifyToken} = require('../middlewares/session');
const {roleValidation} = require('../middlewares/roleValidation');

const everyone = ["user","admin"];
const admin = ["admin"];

router.post('/createUser', verifyToken, roleValidation(admin),registerValidator, createUser);

router.post('/login', loginValidator, loginUser);

module.exports = router;