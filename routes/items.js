const express = require('express');
const router = express.Router();
const {createItem,getItem} = require('../controllers/items');

router.post('/createItem',createItem);

router.get('/getItem',getItem);

module.exports = router