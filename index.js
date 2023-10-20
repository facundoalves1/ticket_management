const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const {dbConnection} = require('./db/dbConnection');
const tickets = require('./routes/tickets');

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
dotenv.config({path: '.env'});

//DBCONNECTION
dbConnection();

//Routes
//app.use('/tickets',tickets);
app.use('/api',require('./routes'));

//Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});