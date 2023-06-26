const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const {dbConnection} = require('./db/dbConnection');

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
dotenv.config({path: '.env'});

//DBCONNECTION
dbConnection();

//Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});