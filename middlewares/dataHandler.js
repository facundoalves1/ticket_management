const {calculator, addDefaultFields} = require('../utils/handleData');
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

const defaultValues = (req,res,next) =>{

    const {_id, name} = req.user;

    if(!_id || !name){

        handleHttp(res, 500, "USER_INFORMATION_NOT_FOUND", req);
        return
    }
    
    addDefaultFields(_id, name, req);
    next();

};

module.exports = {totalCalculation, defaultValues};