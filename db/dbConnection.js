const mongoose = require('mongoose');

const dbConnection = async()=>{
    
    const DB_URI = process.env.DB_URI;

    try{
        await mongoose.connect(DB_URI);
        console.log("CONNECTION SUCCESS");
    }
    catch(err){
        console.log(`CONNECTION ERROR: ${err}`);
    }
};

module.exports = {dbConnection};