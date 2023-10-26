const express = require('express');
const router = express.Router();
const {dataHandler} = require('../middlewares/dataHanddler');
const {validator} = require('../middlewares/dataValidators');
const {saveTicket,getTickets,printTicket,deleteTicket} = require('../controllers/tickets');

router.post('/printTicket', dataHandler, printTicket);

router.post('/saveTicket', validator, dataHandler, saveTicket);

router.get('/getTickets', getTickets);

router.delete('/deleteTicket', deleteTicket);

module.exports = router;