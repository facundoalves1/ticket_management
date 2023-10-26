const Ticket = require('../models/tickets');
const {printer} = require('../utils/printer')

const printTicket = async(req,res)=>{
    
    const {items,total} = req.body
    
    try {
        const result = await printer(items,total);
        res.status(200).send(req.body);
    } catch (error) {
        res.status(500).send(`Issue with the printer: ${error}`)
    }
    
    

};

const saveTicket = async(req,res)=>{
    
    const {body} = req;

    try {
        const result = await Ticket.create(body);
        res.status(200).send({result}); 
    } catch (err) {
        res.status(400).send(`Error trying to save ticket: ${err}}`);
       
    }

};

const deleteTicket = async(req,res)=>{

    const {_id} = req.params;

    try {

        const result = await Ticket.delete(_id);
        res.status(200).send({result})
        
    } catch (error) {

        res.status(400).send(`ERROR TRYING TO DELETE TICKET: ${error}`);
        
    }

};

const getTickets = async(req,res)=>{
    
    try {
        
        const result = await Ticket.find();
        res.status(200).send(result);

    } catch (error) {

        res.status(400).send(`ERROR TRYING TO GET ITEMS: ${error}` );
        
    }
    


};

module.exports = {saveTicket,getTickets,printTicket,deleteTicket,getTickets};