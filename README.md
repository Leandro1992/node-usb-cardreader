# node-usb-cardreader
A NodeJS module to USB Card Reader 

### Github
Open source with a [Github repository]

## Quick-start

```sh
$ npm i node-usb-cardreader
```

```javascript


const USBCardReader = require('node-usb-cardreader')

 

//Default options
const options = {
    onRead: console.log, //function to be called
    onError: console.log, //function to be called
    onConnection: console.log, //function to be called
    idVendor: 0, // Mandatory to connect 
    idProduct: 0, // Mandatory to connect
    lowerCase: true
}

let reader = new USBCardReader({ idVendor: 1204, idProduct: 4623 });

console.log(reader.getDeviceList(true))

```

## Building

| Dependecy  |
| ------  |
| usb |

## Features

  - **getDeviceList** - List all USB devices connecteds
  - **findDeviceByIds** - Get an especific device using idVendor and idProduct


## Information

If you are on Windows you must install WinUSB driver [Zadig]
This project use USB Library for Node  [USB]

## Todos

 - Tests

License
----

[MIT](https://choosealicense.com/licenses/mit/)

[Github repository]: <https://github.com/Leandro1992/node-usb-cardreader>

[Zadig]: <https://zadig.akeo.ie/>

[USB]: <https://www.npmjs.com/package/usb#usbgetdevicelist>