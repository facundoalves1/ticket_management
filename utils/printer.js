const escpos = require('escpos');
escpos.USB = require('escpos-usb')

const printer = (data)=>{

    const device = new escpos.USB();
    const options = { encoding: "GB18030" }
    const execute = new escpos.Printer(device, options)

    device.open(function () {
        execute
          .font('a')
          .align('ct')
          .style('bu')
          .size(1, 1)
          .text(data)
          .cut()
          .close();
      });

};

module.exports = {printer};