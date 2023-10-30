const Ticket = require('../models/tickets');
const {matchedData} = require('express-validator');
const {handleHttp} = require('../utils/handleHttp');
const axios = require('axios');

const printTicket = async(req,res)=>{
    
    const body = matchedData(req);
    
    try {

        await axios.post('https://n54rz7dz-3001.brs.devtunnels.ms/api/ticket/printTicket', body, {headers: {'Content-Type': 'application/json'}})

        handleHttp(res, 200, "TICKET_PRINTED");

    } catch (error) {

        console.log(error)
        handleHttp(res, 500, "PRINTER_ERROR");

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
    const {ticketId} = params;

    try {

        const result = await Ticket.delete(ticketId);
        
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

        const {_id} = req.user;
        
        const result = await Ticket.findByUser(_id);
        
        handleHttp(res, 200, "TICKETS_SUCCESSFULLY_RETRIEVED", result);

    } catch (error) {
        
        console.log(error);
        handleHttp(res, 500, "ERROR_TRYING_TO_GET_ITEMS", error);

    }

};

module.exports = {saveTicket,getTickets,getUserTickets,printTicket,deleteTicket,getTickets};