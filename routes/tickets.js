const express = require('express');
const router = express.Router();
const {dataHandler} = require('../middlewares/dataHanddler');
const {saveTicket,getTickets,getUserTickets,printTicket,deleteTicket} = require('../controllers/tickets');
const {ticketValidator, deleteTicketValidator} = require('../validators/tickets');
const {verifyToken} = require('../middlewares/session');
const {roleValidation} = require('../middlewares/roleValidation');

const everyone = ["user","admin"];
const admin = ["admin"];

router.post('/printTicket',verifyToken, roleValidation(everyone), dataHandler, ticketValidator, printTicket);

router.post('/saveTicket', verifyToken, roleValidation(everyone), dataHandler, ticketValidator, saveTicket);

router.get('/getTickets', verifyToken, roleValidation(admin), getTickets);

router.get('/getUserTickets', verifyToken, roleValidation(everyone), getUserTickets);

router.delete('/deleteTicket',verifyToken, roleValidation(everyone), deleteTicketValidator, deleteTicket);

module.exports = router;