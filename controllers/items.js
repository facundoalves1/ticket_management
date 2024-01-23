const Item = require('../models/items');
const {handleHttp} = require('../utils/handleHttp');
const {matchedData} = require('express-validator');
const {itemProcessor} = require('../utils/handleData');

const createItems = async(req,res)=>{

    const body = matchedData(req);

    try {
        
        const result = await itemProcessor(body);

        handleHttp(res, 200, "ITEMS_PROCESS_FINISHED",result);

    } catch (error) {

        handleHttp(res, 500, "ERROR_TRYING_TO_CREATE_ITEMS",error);
        
    }

};

const getItems = async(req,res)=>{

    try {
        
        const result = await Item.find();

        handleHttp(res, 200, "ITEMS_SUCCESSFULLY_RETRIEVED", result);

    } catch (error) {

        handleHttp(res, 500, "ERROR_TRYING_TO_GET_ITEMS", error);
        
    }

};

const getItemsBybarcode = async(req,res)=>{

    const params = matchedData(req);
    const {barcode} = params;

    try{

        const result = await Item.findOne({'barcode': barcode});

        handleHttp(res, 200, "ITEMS_SUCCESSFULLY_RETRIEVED", result);

    }catch(error){

        handleHttp(res, 500, "ERROR_TRYING_TO_GET_ITEMS", error);

    }

};

module.exports = {createItems, getItems, getItemsBybarcode};