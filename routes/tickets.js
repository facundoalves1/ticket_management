const express = require('express');
const router = express.Router();
const {dataHandler} = require('../middlewares/dataHanddler');
const {postTicket,getTickets} = require('../controllers/tickets');

router.post('/submitTicket',dataHandler,postTicket);

router.get('/getTickets',getTickets);

module.exports = router;