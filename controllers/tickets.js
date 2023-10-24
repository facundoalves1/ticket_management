const Ticket = require('../models/tickets');
const {printer} = require('../utils/printer')

const printTicket = async(req,res)=>{
    
    const {items,total} = req.body
    
    try {
        const result = await printer(items,total);
        res.status(200).send(req.body);
    } catch (error) {
        res.status(500).send("Issue with the printer: " + error)
    }
    
    

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