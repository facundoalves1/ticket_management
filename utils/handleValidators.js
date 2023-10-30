const {validationResult} = require('express-validator');
const {handleHttp} = require('../utils/handleHttp');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns Validations results
 */
const validateResults = (req,res,next)=>{

    try {

        validationResult(req).throw();
        return next();
        
    } catch (error) {

        handleHttp(res, 400, "DATA_VALIDATION_ERROR");
        
    }

};

module.exports = {validateResults};