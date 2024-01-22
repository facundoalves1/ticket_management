const escpos = require('escpos');
escpos.USB = require('escpos-usb');
const usb = require('usb');
const {handleHttp} = require('../utils/handleHttp');

const printer = async(items,total,name) => {

  try {
    
    const devices = usb.getDeviceList();
    console.log(devices);

    const device = new escpos.USB();
    const options = { encoding: "GB18030" };
    const execute = new escpos.Printer(device, options);  
    
    device.open(function(err){
    
      execute
      .font('a')
      .align('ct')
      .style('bu')
      .size(1,1)
      .text("CASA ALVES")
      .size(0,0)
      .feed(2)
      .marginLeft(0)
      .marginRight(0)
      .marginBottom(0)
      .tableCustom([
        {text:"Cant/Producto",align:"LEFT"},
        {text:"Precio", align:"LEFT"}
      ]);

      items.forEach((element)=>{

        return execute.tableCustom([
          {text:`${element.quantity}x${element.name}`, align:"LEFT"},
          {text:`\$${element.price} c/u`, align:"LEFT"}
        ]);

      });

      execute.drawLine()
      .tableCustom([{text:`Total: \$${total}`, align:"CENTER"}])
      .feed(2)
      .tableCustom([{text:`Vendedor: ${name}`, align:"LEFT"}])
      .feed(5)
      .close();

  });
    
  } catch (error) {
    
    console.log(error);
    handleHttp(res, 500, "PRINTER_ERROR");

  }

};

module.exports = { printer };
