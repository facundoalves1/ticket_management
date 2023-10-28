/**
 * Return http response
 * @param {*} res 
 * @param {*} code 
 * @param {*} message 
 * @param {*} result 
 */
const handleHttp = (res,code,message,result)=>{

    res.status(code).json({payload: result, status: code, message: message});

};

module.exports = {handleHttp};