const {customValidator} = require('../utils/customValidator');

const validator = (req,res,next)=>{

    const {items} = req.body;

    const response = customValidator(items);
    
    if(!response.result){

        res.status(500).send(`Invalid key: ${response.error}`);

    }else{

        next();

    }
    
    
    
};

module.exports = {validator}