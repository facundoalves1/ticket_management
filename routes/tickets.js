const express = require('express');
const router = express.Router();
const {postTicket,getTickets} = require('../controllers/tickets');

router.post('/submitTicket',postTicket);

router.get('/getTickets',getTickets);

module.exports = router;