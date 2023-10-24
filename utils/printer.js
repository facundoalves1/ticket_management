const escpos = require("escpos");
escpos.USB = require("escpos-usb");

const printer = (items,total) => {
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

      //return execute.table([element.name,`\$${element.price}`])
      return execute.tableCustom([
        {text:`${element.quantity}x${element.name}`, align:"LEFT"},
        {text:`\$${element.price} c/u`, align:"LEFT"}
      ]);

    });

    execute.drawLine()
    .tableCustom([{text:`Total: \$${total}`, align:"CENTER"}])
    .feed(5)
    .close()
  });

};


module.exports = { printer };
