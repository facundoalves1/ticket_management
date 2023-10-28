const {handleHttp} = require('../utils/handleHttp');

/**
 * Role validation
 * @param {*} allowedRole 
 * @returns 
 */
const roleValidation = (allowedRole)=> (req,res,next)=>{

    try {

        const {role} = req.user;
        
        const checkRole = allowedRole.some((element)=>{

            return role.includes(element);

        });

        if(!checkRole){

            handleHttp(res, 401, "ACCESS_DENIED");
            return
            
        }

        next();

    } catch (error) {

        handleHttp(res, 500, "ROLE_VALIDATION_ERROR", error);
        
    }

};

module.exports = {roleValidation};