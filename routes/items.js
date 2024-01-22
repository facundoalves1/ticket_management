const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/session');
const {roleValidation} = require('../middlewares/roleValidation');
const {getItems, createItems} = require('../controllers/items');
const {defaultValues} = require('../middlewares/dataHandler');
const {itemValidator} = require('../validators/items');

const everyone = ["user","admin"];
const admin = ["admin"];

router.get('/getItems', verifyToken, roleValidation(everyone), getItems);

router.post('/createItem', verifyToken, roleValidation(admin), defaultValues, itemValidator, createItems);

module.exports = router;