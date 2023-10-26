const express = require('express');
const router = express.Router();
const {dataHandler} = require('../middlewares/dataHanddler');
const {saveTicket,getTickets,printTicket,deleteTicket} = require('../controllers/tickets');
const {ticketValidator} = require('../validators/tickets');

router.post('/printTicket', dataHandler, ticketValidator, printTicket);

router.post('/saveTicket', dataHandler, ticketValidator, saveTicket);

router.get('/getTickets', getTickets);

router.delete('/deleteTicket', deleteTicket);

module.exports = router;