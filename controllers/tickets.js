const Ticket = require('../models/tickets');

const printTicket = async(req,res)=>{

    res.send('building');

};

const saveTicket = async(req,res)=>{
    
    const {body} = req;

    try {
        const result = await Ticket.create(body);
        res.status(200).send({result}); 
    } catch (err) {
        res.status(400).send("Error trying to save ticket: " + err);
        console.log(result);
    }

};

const getTickets = (req,res)=>{
    res.send("Controller");
};

module.exports = {saveTicket,getTickets,printTicket};