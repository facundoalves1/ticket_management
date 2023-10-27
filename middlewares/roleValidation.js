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

            res.status(403).send("ACCESS_DENIED: USER_WITHOUT_PROPER_ROLE");
            return
        }

        next();

    } catch (error) {

        res.status(500).send(`UNABLE_TO_VALIDATE_ROLE: ${error}}`);
        
    }

};

module.exports = {roleValidation};