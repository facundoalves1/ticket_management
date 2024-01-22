/**
 * Returns sumatory of price * quantity
 * @param {*} req 
 * @returns 
 */
const calculator = (req) => {

    const { items } = req.body;
    
    const result = items.reduce((acc, current) => {
      
      return acc + current.price * current.quantity;
      
    }, 0);
    
    return result;

  };

/**
 * Add fields and values for aditory
 * @param {*} userId
 * @param {*} userName
 * @param {*} req
 */
const addDefaultFields = (userId, userName, req)=>{

    const allowedPaths = ['/createUser','/createItem','/saveTicket'];
    const path = req.route.path;
    
    if(!userId || !userName){

      return null;

    }

    const checkPath = allowedPaths.some((element)=>{

        return path.includes(element);

    });

    if(checkPath){

      req.body.createdBy = userId;
      req.body.updatedBy = userId;
      req.body.createdByDisplayValue = userName;
      req.body.updatedByDisplayValue = userName;

      if(path == '/createUser'){

        req.body.active = true;
  
      }

    }
  
    req.body.updatedBy = userId;
    req.body.updatedByDisplayValue = userName;
    //status
}

module.exports = {calculator, addDefaultFields};
  