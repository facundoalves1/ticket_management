const {calculator} = require('../utils/calculator');

const dataHandler = (req,res,next)=>{

    const result = calculator(req);
    
    if(result){

        req.body.total = result;
        
        next();

    }else{
        
        res.status(500).send("ERROR_TOTAL_CALCULATION");

    }

};

module.exports = {dataHandler};