const {tokenVerification} = require('../utils/handleJwt');
const {handleHttp} = require('../utils/handleHttp');
const User = require('../models/users');

const verifyToken = async(req,res,next)=>{

    try {

        const {authorization} = req.headers;

        if(!authorization){

            handleHttp(res, 400, "AUTHORIZATION_METHOD_REQUIRED");
            return

        }

        const token = authorization.split(" ").pop();
        const tokenData = await tokenVerification(token);
        
        if(!tokenData){

            handleHttp(res, 400, "PAYLOAD_DATA_NOT_FOUND");
            return

        }

        const {_id} = tokenData

        const userData = await User.findById(_id);
        req.user = userData;
        
        next();

    } catch (error) {

        handleHttp(res, 500, "SESSION_VERIFICATION_ERROR", error);
        
    }

};

module.exports = {verifyToken};