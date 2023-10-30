const express = require('express');
const router = express.Router();
const {createUser, loginUser, userState} = require('../controllers/auth');
const {registerValidator, loginValidator, authParamValidator} = require('../validators/auth');
const {verifyToken} = require('../middlewares/session');
const {roleValidation} = require('../middlewares/roleValidation');
const {defaultValues} = require('../middlewares/dataHandler');

const everyone = ["user","admin"];
const admin = ["admin"];

router.post('/createUser', verifyToken, roleValidation(admin), defaultValues, registerValidator, createUser);

router.post('/login', loginValidator, loginUser);

router.patch('/deactivateUser/:userId/:state', verifyToken, roleValidation(admin), authParamValidator, userState);

module.exports = router;