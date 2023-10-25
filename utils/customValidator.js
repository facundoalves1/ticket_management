const customValidator = (data)=>{

    const response = {

        result: true,
        error: ""

    };

    const validKeys = ['quantity','name','price'];
    
    for(element of data){

        for(const key in element){

            if(!validKeys.includes(key)){
                
                response.result = false;
                response.error = key;

                return response

            }

        }

    };

    return response;

};

module.exports = {customValidator};