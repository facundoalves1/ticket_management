const express = require('express');
const router = express.Router();
const {totalCalculation, defaultValues} = require('../middlewares/dataHandler');
const {saveTicket,getTickets,getUserTickets,printTicket,deleteTicket, getUserTicketsToday, getTicketsToday} = require('../controllers/tickets');
const {ticketValidator, ticketParamsValidator} = require('../validators/tickets');
const {verifyToken} = require('../middlewares/session');
const {roleValidation} = require('../middlewares/roleValidation');

const everyone = ["user","admin"];
const admin = ["admin"];

router.post('/printTicket',verifyToken, roleValidation(everyone), ticketValidator, printTicket);

router.post('/saveTicket', verifyToken, roleValidation(everyone), defaultValues, totalCalculation, ticketValidator, saveTicket);

router.get('/getTickets', verifyToken, roleValidation(admin), getTickets);

router.get('/getUserTickets', verifyToken, roleValidation(everyone), getUserTickets);

router.get('/getUserTicketsToday', verifyToken, roleValidation(everyone), getUserTicketsToday);

router.get('/getTicketsToday', verifyToken, roleValidation(everyone), getTicketsToday);

router.delete('/deleteTicket/:ticketId',verifyToken, roleValidation(everyone), defaultValues, ticketParamsValidator, deleteTicket);

module.exports = router;