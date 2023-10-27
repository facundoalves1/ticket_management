const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

const signToken = (user)=>{
    
    const sign = jwt.sign(

        {
            _id: user._id,
            userid: user.userid,
            role: user.role
        },

        JWT_SECRET,

        {
            expiresIn: "20h"
        }

    );
    
    return sign;

};

const tokenVerification = (token)=>{

    try {
        
        return  jwt.verify(token, JWT_SECRET);
        
    } catch (error) {

        return null;
        
    }

};

module.exports = {signToken, tokenVerification};