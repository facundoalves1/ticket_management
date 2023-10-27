const {tokenVerification} = require('../utils/handleJwt');
const User = require('../models/users');

const verifyToken = async(req,res,next)=>{

    try {

        const {authorization} = req.headers;

        if(!authorization){

            res.status(400).send("AUTHORIZATION_METHOD_REQUIRED");
            return
        }

        const token = authorization.split(" ").pop();
        const tokenData = await tokenVerification(token);
        
        if(!tokenData){

            res.status(400).send("PAYLOAD_DATA_NOT_FOUND");
            return
        }

        const {_id} = tokenData

        const userData = await User.findById(_id);
        req.user = userData;
        
        next();

    } catch (error) {

        res.status(500).send(`ERROR_TRYING_TO_VERIFY_SESSION: ${error}`);
        
    }

};

module.exports = {verifyToken};