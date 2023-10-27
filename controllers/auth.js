const User = require('../models/users');
const {matchedData} = require('express-validator');
const {encryptPassword, comparePassword} = require('../utils/handlePassword');
const {signToken} = require('../utils/handleJwt');

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

        res.status(200).send({payload});
    
    } catch (error) {

        res.status(400).send(`ERROR TRYING TO CREATE USER: ${error}`);
        
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

            res.status(404).send("USER_NOT_FOUND");
            return

        }

        const encryptedPass = userData.get('password');
        const checkUserPass = await comparePassword(password, encryptedPass);

        if(!checkUserPass){

            res.status(401).send("INVALID_PASSWORD");
            return

        }

        userData.set('password', undefined, {strict: false});

        const payload = {

            token: await signToken(userData),
            user: userData

        }

        res.status(200).send({payload});

    } catch (error) {

        res.status(500).send(`LOGING_USER_ERROR: ${error}`);
        
    }

};

module.exports = {createUser, loginUser};