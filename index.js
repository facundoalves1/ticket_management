const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

//Middlewares
app.use(cors());
app.use(bodyParser.json());
dotenv.config({path: '.env'});

//Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});