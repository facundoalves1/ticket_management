const {check} = require('express-validator');
const {validateResults} = require('../utils/handleValidators');

const registerValidator = [

    check("name").exists().isString().notEmpty().isLength({min:3,max:100}),
    check("userid").exists().isString().notEmpty().isLength({min:3,max:100}),
    check("password").exists().isString().notEmpty().isLength({min:3,max:100}),
    check("role").exists().isArray().notEmpty(),
    (req,res,next)=>{

        return validateResults(req,res,next);

    }

];

const loginValidator = [

    check("userid").exists().isString().notEmpty().isLength({min:3,max:100}),
    check("password").exists().isString().notEmpty().isLength({min:3,max:100}),
    (req,res,next)=>{

        return validateResults(req,res,next);

    }

];

module.exports = {registerValidator, loginValidator};