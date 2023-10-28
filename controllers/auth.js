const User = require('../models/users');
const {matchedData} = require('express-validator');
const {encryptPassword, comparePassword} = require('../utils/handlePassword');
const {signToken} = require('../utils/handleJwt');
const {handleHttp} = require('../utils/handleHttp');

/**
 * Create user controller
 * @param {*} req 
 * @param {*} res 
 */
const createUser = async(req,res)=>{

    try {

        const body = matchedData(req);
        const {password} = body;
        
        const encryptedPass = await encryptPassword(password);
        body.password = encryptedPass;

        const userData = await User.create(body);
        userData.set('password', undefined, {strict:false});
        

        const payload = {

            token: await signToken(userData),
            user: userData

        }

        handleHttp(res, 200, "USER_CREATED_SUCCESSFULLY", payload);
    
    } catch (error) {

        handleHttp(res, 400, "ERROR_TRYING_TO_CREATE_USER", error);

    }

};

/**
 * Login user controller
 * @param {*} req 
 * @param {*} res 
 */
const loginUser = async(req,res)=>{

    try {

        const body = matchedData(req);
        const {userid,password} = body;

        const userData = await User.findOne({userid: userid})
        .select('password name userid role deleted createdAt updatedAt');

        if(!userData){

            handleHttp(res, 400, "USER_NOT_FOUND", body);
            return

        }

        const encryptedPass = userData.get('password');
        const checkUserPass = await comparePassword(password, encryptedPass);

        if(!checkUserPass){

            handleHttp(res, 400, "INVALID_PASSWORD", body);
            return

        }

        userData.set('password', undefined, {strict: false});

        const payload = {

            token: await signToken(userData),
            user: userData

        }

        handleHttp(res, 200, "LOGIN_SUCCESSFULL", body);

    } catch (error) {

        handleHttp(res, 400, "LOGING_ERROR", error);
        
    }

};

module.exports = {createUser, loginUser};