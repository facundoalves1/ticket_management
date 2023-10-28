const Ticket = require('../models/tickets');
const {printer} = require('../utils/printer')
const {matchedData} = require('express-validator');
const {handleHttp} = require('../utils/handleHttp');

const printTicket = async(req,res)=>{
    
    const body = matchedData(req);
    const {items,total} = body;
    
    try {

        const result = await printer(items,total);
        handleHttp(res, 200, "TICKET_PRINTED", result);

    } catch (error) {

        handleHttp(res, 500, "PRINTER_ERROR", error);

    }
    
};

const saveTicket = async(req,res)=>{
    
    const body = matchedData(req);

    try {

        const result = await Ticket.create(body);
        
        handleHttp(res, 200, "TICKET_SAVED", result);

    } catch (error) {

        handleHttp(res, 500, "ERROR_TRYING_TO_SAVE_TICKET", error);

    }
    
};

const deleteTicket = async(req,res)=>{

    const params = matchedData(req);
    const {_id} = params;

    try {

        const result = await Ticket.delete(_id);
        
        handleHttp(res, 200, "TICKET_DELETED", result);
        
    } catch (error) {

        handleHttp(res, 500, "ERROR_TRYING_TO_DELETE_TICKET", error);
        
    }

};

const getTickets = async(req,res)=>{
    
    try {
        
        const result = await Ticket.find();
        
        handleHttp(res, 200, "TICKETS_SUCCESSFULLY_RETRIEVED", result);

    } catch (error) {

        handleHttp(res, 500, "ERROR_TRYING_TO_GET_ITEMS", error);
        
    }
    
};

const getUserTickets = async(req,res)=>{

    try {

        const params = matchedData(req);
        const {_id} = params;
        
        const result = await Ticket.findByUserId({_id});
        console.log(result)
        handleHttp(res, 200, "TICKETS_SUCCESSFULLY_RETRIEVED", result);

    } catch (error) {
        console.log(error);
        handleHttp(res, 500, "ERROR_TRYING_TO_GET_ITEMS", error);

    }

};

module.exports = {saveTicket,getTickets,getUserTickets,printTicket,deleteTicket,getTickets};