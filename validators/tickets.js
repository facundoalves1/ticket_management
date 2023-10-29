const {check} = require('express-validator');
const {validateResults} = require('../utils/handleValidators');

const ticketValidator = [
    
    check('items').exists().isArray(),
    check('items.*.quantity').exists().isInt({min:1}).notEmpty(),
    check('items.*.name').exists().isString().notEmpty(),
    check('items.*.price').exists().isInt({min:1}).notEmpty(),
    check('total').exists().isInt({min:1}).notEmpty(),
    check('createdBy').exists().isMongoId().notEmpty(),
    check('updatedBy').exists().isMongoId().notEmpty(),
    check('createdByDisplayValue').exists().isString().notEmpty(),
    check('updatedByDisplayValue').exists().isString().notEmpty(),
    (req,res,next)=>{

        return validateResults(req,res,next);

    }

];

const paramsValidator = [

    check('_id').exists().notEmpty().isMongoId(),
    (req,res,next)=>{

        return validateResults(req,res,next);

    }

];

module.exports = {ticketValidator, paramsValidator};
