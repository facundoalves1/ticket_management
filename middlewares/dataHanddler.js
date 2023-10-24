const {calculator} = require('../utils/calculator');

const dataHandler = (req,res,next)=>{

    const result = calculator(req);
    
    if(result){
        req.body.total = result;
        next();
    }else{
        res.status(500).send("Middleware wasn't able to calculate total");
    }

};

module.exports = {dataHandler};