const USBCardReader = require('./index');

let reader = new USBCardReader({ idVendor: 1204, idProduct: 4623 });

console.log(reader.getDeviceList(true))

console.log(reader.findDeviceByIds(1204, 4623))