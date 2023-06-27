const {ticketSchema} = require('../models/tickets');

const postTicket = (req,res)=>{
    res.send("Controller");
};

const getTickets = (req,res)=>{
    res.send("Controller");
};

module.exports = {postTicket,getTickets};