const { exec } = require("child_process");
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
    .size(0,0)
    .feed(2)
    .marginLeft(0)
    .marginRight(0)
    items.forEach((element)=>{

      //return execute.table([element.name,`\$${element.price}`])
      return execute.tableCustom([
        {text:element.name, align:"LEFT"},
        {text:`\$${element.price}`, align:"LEFT"}
      ]);

    });

    execute.feed(2)
    .drawLine()
    .tableCustom([{text:`Total: \$${total}`, align:"CENTER"}])
    .feed(5)
    .close()
  });

};


module.exports = { printer };
