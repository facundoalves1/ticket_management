const Ticket = require('../models/tickets');
const {matchedData} = require('express-validator');
const {handleHttp} = require('../utils/handleHttp');
const {itemProcessor} = require('../utils/handleData')
const axios = require('axios');

const printTicket = async(req,res)=>{
    
    const body = matchedData(req);
    
    try {

        await axios.post('https://b46fxbpk-3001.brs.devtunnels.ms/api/ticket/printTicket', body, {headers: {'Content-Type': 'application/json'}})

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

        //Process ticket items
        await itemProcessor(body);

        handleHttp(res, 200, "TICKET_SAVED", result);

    } catch (error) {

        handleHttp(res, 500, "ERROR_TRYING_TO_SAVE_TICKET", error);
        console.log(error)

    }
    
};

const deleteTicket = async(req,res)=>{

    const params = matchedData(req);
    const {ticketId} = params;
    const {updatedBy, updatedByDisplayValue} = req.body

    try {
        
        await Ticket.updateOne({_id: ticketId}, {updatedBy: updatedBy, updatedByDisplayValue: updatedByDisplayValue});

        const result = await Ticket.delete({_id: ticketId});
        
        handleHttp(res, 200, "TICKET_DELETED", result);
        
    } catch (error) {

        console.log(error);
        handleHttp(res, 500, "ERROR_TRYING_TO_DELETE_TICKET", error);
        
    }

};

const getTickets = async(req,res)=>{
    
    try {
        
        const result = await Ticket.find();
        
        handleHttp(res, 200, "TICKETS_SUCCESSFULLY_RETRIEVED", result);

    } catch (error) {

        handleHttp(res, 500, "ERROR_TRYING_TO_GET_TICKETS", error);
        
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

const getUserTicketsToday = async(req,res)=>{}


module.exports = {saveTicket,getTickets,getUserTickets,printTicket,deleteTicket,getTickets, getUserTicketsToday};