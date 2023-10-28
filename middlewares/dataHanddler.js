const {calculator} = require('../utils/calculator');
const {handleHttp} = require('../utils/handleHttp');

const totalCalculation = (req,res,next)=>{

    const result = calculator(req);
    
    if(!result){

        handleHttp(res, 500, "DATA_CALCULATION_ERROR");
        return
    }

    req.body.total = result;
    next();

};

const createAudit = (req,res,next) =>{

    const {_id, name} = req.user;

    if(!_id){

        handleHttp(res, 500, "USER_INFORMATION_NOT_FOUND", req);

    }
    
    req.body.createdBy = _id;
    req.body.updatedBy = _id;
    req.body.createdByDisplayValue = name;
    req.body.updatedByDisplayValue = name;
    next();

};

module.exports = {totalCalculation, createAudit};