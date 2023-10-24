const express = require('express');
const router = express.Router();
const {dataHandler} = require('../middlewares/dataHanddler');
const {saveTicket,getTickets,printTicket} = require('../controllers/tickets');

router.post('/printTicket',dataHandler,printTicket);

router.post('/saveTicket',dataHandler,saveTicket);

router.get('/getTickets',getTickets);

module.exports = router;