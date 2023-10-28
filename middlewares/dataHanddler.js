const {calculator} = require('../utils/calculator');
const {handleHttp} = require('../utils/handleHttp');

const dataHandler = (req,res,next)=>{

    const result = calculator(req);
    
    if(!result){

        handleHttp(res, 500, "DATA_CALCULATION_ERROR");
        return
    }

    req.body.total = result;
    next();
    
};

module.exports = {dataHandler};