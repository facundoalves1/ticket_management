const {check} = require('express-validator');
const {validateResults} = require('../utils/handleValidators');

const itemValidator = [
    
    check('items').exists().isArray(),
    check('items.*.name').exists().isString().notEmpty(),
    check('items.*.price').exists().isInt({min:1}).notEmpty(),
    check('items.*.barcode').exists().isString(),
    check('items.*.internalcode').exists().isString(),
    check('createdBy').exists().isMongoId().notEmpty(),
    check('updatedBy').exists().isMongoId().notEmpty(),
    check('createdByDisplayValue').exists().isString().notEmpty(),
    check('updatedByDisplayValue').exists().isString().notEmpty(),
    (req,res,next)=>{

        return validateResults(req,res,next);

    }

];

module.exports = {itemValidator};
