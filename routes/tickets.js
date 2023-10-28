const express = require('express');
const router = express.Router();
const {totalCalculation, createAudit} = require('../middlewares/dataHanddler');
const {saveTicket,getTickets,getUserTickets,printTicket,deleteTicket} = require('../controllers/tickets');
const {ticketValidator, paramsValidator} = require('../validators/tickets');
const {verifyToken} = require('../middlewares/session');
const {roleValidation} = require('../middlewares/roleValidation');

const everyone = ["user","admin"];
const admin = ["admin"];

router.post('/printTicket',verifyToken, roleValidation(everyone), totalCalculation, ticketValidator, printTicket);

router.post('/saveTicket', verifyToken, roleValidation(everyone), createAudit, totalCalculation, ticketValidator, saveTicket);

router.get('/getTickets', verifyToken, roleValidation(admin), getTickets);

router.get('/getUserTickets', verifyToken, roleValidation(everyone), paramsValidator, getUserTickets);

router.delete('/deleteTicket',verifyToken, roleValidation(everyone), paramsValidator, deleteTicket);

module.exports = router;