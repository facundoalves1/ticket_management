const {check} = require("express-validator");
const {validateResults} = require('../utils/handleValidators');

const ticketValidator = [
    
    check("items").exists().isArray(),
    check("items.*.quantity").exists().isInt().notEmpty(),
    check("items.*.name").exists().isString().notEmpty(),
    check("items.*.price").exists().isInt().notEmpty(),
    check("total").exists().isInt().notEmpty(),
    (req,res,next)=>{

        return validateResults(req,res,next);

    }

];

const deleteTicketValidator = [

    check("_id").exists().notEmpty().isMongoId(),
    (req,res,next)=>{

        return validateResults(req,res,next);

    }

];

module.exports = {ticketValidator, deleteTicketValidator};
