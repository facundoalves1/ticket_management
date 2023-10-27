const Ticket = require('../models/tickets');
const {printer} = require('../utils/printer')
const {matchedData} = require('express-validator');

const printTicket = async(req,res)=>{
    
    const body = matchedData(req);
    const {items,total} = body;
    
    try {

        const result = await printer(items,total);
        res.status(200).send({result});

    } catch (error) {

        res.status(500).send(`Error with printer: ${error}`);

    }
    
};

const saveTicket = async(req,res)=>{
    
    const body = matchedData(req);

    try {

        const result = await Ticket.create(body);
        res.status(200).send({result});

    } catch (err) {

        res.status(400).send(`Error trying to save ticket: ${err}}`);
       
    }
    
};

const deleteTicket = async(req,res)=>{

    const params = matchedData(req);
    const {_id} = params;
    console.log(_id);

    try {

        const result = await Ticket.delete({_id});
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

const getUserTickets = async(req,res)=>{

    res.send('Building');

};

module.exports = {saveTicket,getTickets,getUserTickets,printTicket,deleteTicket,getTickets};