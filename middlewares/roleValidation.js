const {handleHttp} = require('../utils/handleHttp');

/**
 * Role validation and status
 * @param {*} allowedRole 
 * @returns 
 */
const roleValidation = (allowedRole)=> (req,res,next)=>{

    try {

        const {role, active} = req.user;

        if(!active){

            handleHttp(res, 401, "INACTIVE_USER");

        }
        
        const checkRole = allowedRole.some((element)=>{

            return role.includes(element);

        });

        if(!checkRole){

            handleHttp(res, 401, "ACCESS_DENIED");
            return
            
        }

        next();

    } catch (error) {

        handleHttp(res, 500, "ROLE_VALIDATION_ERROR");
        
    }

};

module.exports = {roleValidation};