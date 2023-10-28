/**
 * Return http response
 * @param {*} res 
 * @param {*} code 
 * @param {*} message 
 * @param {*} result 
 */
const handleHttp = (res,code,message,result)=>{

    res.status(code).json({result: result, code: code, message: message});

};

module.exports = {handleHttp};