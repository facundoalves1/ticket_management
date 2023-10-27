const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const signToken = async(user)=>{

    const sign = jwt.sign(

        {
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

const tokenVerification = async(token)=>{

    try {

        return jwt.verify(token, JWT_SECRET);
        
    } catch (error) {

        return null;
        
    }

};

module.exports = {signToken, tokenVerification};