const express = require('express');
const router = express.Router();
const {dataHandler} = require('../middlewares/dataHanddler');
const {saveTicket,getTickets,printTicket,deleteTicket} = require('../controllers/tickets');
const {ticketValidator, deleteTicketValidator} = require('../validators/tickets');
const {verifyToken} = require('../middlewares/session');

router.post('/printTicket',verifyToken, dataHandler, ticketValidator, printTicket);

router.post('/saveTicket', verifyToken, dataHandler, ticketValidator, saveTicket);

router.get('/getTickets', verifyToken, getTickets);

router.delete('/deleteTicket',verifyToken, deleteTicketValidator, deleteTicket);

module.exports = router;