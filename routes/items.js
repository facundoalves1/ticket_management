const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/session');
const {roleValidation} = require('../middlewares/roleValidation');
const {getItems, createItems, getItemsBybarcode} = require('../controllers/items');
const {defaultValues} = require('../middlewares/dataHandler');
const {itemValidator, itemParamValidatorBarcode, itemParamValidatorInternalcode} = require('../validators/items');

const everyone = ["user","admin"];
const admin = ["admin"];

router.get('/getItems', verifyToken, roleValidation(everyone), getItems);

router.post('/createItem', verifyToken, roleValidation(admin), defaultValues, itemValidator, createItems);

router.get('/getItemByBarcode/:barcode',verifyToken, roleValidation(everyone), itemParamValidatorBarcode, getItemsBybarcode);

module.exports = router;