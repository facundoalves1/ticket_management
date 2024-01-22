const Item = require("../models/items");

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
const addDefaultFields = (userId, userName, req) => {
  const allowedPaths = ["/createUser", "/createItem", "/saveTicket"];
  const path = req.route.path;

  if (!userId || !userName) {
    return null;
  }

  const checkPath = allowedPaths.some((element) => {
    return path.includes(element);
  });

  if (checkPath) {
    req.body.createdBy = userId;
    req.body.updatedBy = userId;
    req.body.createdByDisplayValue = userName;
    req.body.updatedByDisplayValue = userName;

    if (path == "/createUser") {
      req.body.active = true;
    }
  }

  req.body.updatedBy = userId;
  req.body.updatedByDisplayValue = userName;
};

const itemProcessor = async(body) => {

  const {
    items,
    createdBy,
    updatedBy,
    createdByDisplayValue,
    updatedByDisplayValue,
    
  } = body;

  const options = {upsert: true, new: true, setDefaultsOnInsert: true};
  const result = [];

  try {

    for(let element of items) {
      
      let query = {$or:[{'barcode':element.barcode},{'internalcode':element.internalcode}]};


      let update = {
        name: element.name,
        price: element.price,
        barcode: element.barcode,
        internalcode: element.internalcode,
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdByDisplayValue: createdByDisplayValue,
        updatedByDisplayValue: updatedByDisplayValue
      }

      let procRes = await Item.findOneAndUpdate(query,update,options);
      
      result.push(procRes);

    }

    return(result);

  } catch (error) {
    
    return error;

  }
};

module.exports = { calculator, addDefaultFields, itemProcessor };