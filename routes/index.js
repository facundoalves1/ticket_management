const fs = require('fs');
const express = require('express');
const router = express.Router();

const ABSOLUTE_PATH = __dirname;

const deleteExtension = (filename)=>{
    return filename.split('.').shift();
};

fs.readdirSync(ABSOLUTE_PATH).filter((file)=>{

    const name = deleteExtension(file);

    if(name !== 'index'){

        console.log(`Loading Route ${name}`);
        router.use(`/${name}`,require(`./${file}`));

    }

});

module.exports = router;