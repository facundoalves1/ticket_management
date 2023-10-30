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
        const {password, userid} = body;

        const existingUser = await User.findOne({userid: userid});

        if(existingUser){

            handleHttp(res, 400, "USER_ID_NOT_AVAILABLE");
            return

        }
        
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

        handleHttp(res, 400, "USER_CREATION_ERROR");

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
        .select('password name userid role deleted createdAt updatedAt active');

        if(!userData){

            handleHttp(res, 400, "USER_NOT_FOUND");
            return

        }

        if(!userData.active){

            handleHttp(res, 400, "INACTIVE_USER");
            return
            
        }

        const encryptedPass = userData.get('password');
        const checkUserPass = await comparePassword(password, encryptedPass);

        if(!checkUserPass){

            handleHttp(res, 400, "INVALID_PASSWORD");
            return

        }

        userData.set('password', undefined, {strict: false});

        const payload = {

            token: await signToken(userData),
            user: userData

        }

        handleHttp(res, 200, "LOGIN_SUCCESSFULL", payload);

    } catch (error) {

        handleHttp(res, 400, "LOGING_ERROR");
        
    }

};

/**
 * Delete User
 * @param {*} req 
 * @param {*} res 
 */
const deleteUser = (req,res)=>{};

const getUsers = (req,res)=>{};

const userState = async(req,res)=>{

    try {
        
        const params = matchedData(req);
        const {userId, state} = params;

        const userData = await User.findOne({_id: userId});

        if(!userData){

            handleHttp(res, 400, "USER_NOT_FOUND");
            return
        }

        const userState = userData.get('active');

        if(state == userState){

            handleHttp(res, 400, "USER_STATE_ERROR");
            return

        }

        const payload = await User.updateOne({_id: userId}, {active: state});

        if(!payload){

            handleHttp(res, 500, "UPDATE_ERROR", payload);
            return

        }

        handleHttp(res, 200, "UPDATED_SUCCESSFULLY", payload);

    } catch (error) {
        console.log(error)
        handleHttp(res, 500, "UPDATE_ERROR");
        
    }

};

module.exports = {createUser, loginUser, deleteUser, getUsers, userState};