const bcryptjs = require('bcryptjs');

/**
 * Plain text user password
 * @param {*} password 
 * @returns Encrypted password
 */
const encryptPassword = async(password)=>{

    return await bcryptjs.hash(password, 10);
    
};

/**
 * Plain text password and encrypted password
 * @param {*} password 
 * @param {*} encryptPassword 
 * @returns true or false
 */
const comparePassword = async(password, encryptedPassword)=>{

    return await bcryptjs.compare(password, encryptedPassword);

};

module.exports = {encryptPassword, comparePassword}