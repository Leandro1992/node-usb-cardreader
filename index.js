var usb = require('usb');

class USBCardReader {
    constructor(options) {
        let default_options = {
            onRead: console.log,
            onError: console.log,
            onConnection: console.log,
            idVendor: 0,
            idProduct: 0,
            lowerCase: true
        }
        this.keymap = { '4': 'A', '5': 'B', '6': 'C', '7': 'D', '8': 'E', '9': 'F', '1e': '1', '1f': '2', '20': '3', '21': '4', '22': '5', '23': '6', '24': '7', '25': '8', '26': '9', '27': '0', '00': '' };
        this.options = Object.assign(default_options, options)
        this.read = '';
        this.device = null;
        this.openConnection();
    }

    openConnection() {
        try {
            this.device = usb.findByIds(this.options.idVendor, this.options.idProduct);
            this.device.open();
            this.device.interfaces[0].claim();
            this.device.interfaces[0].endpoints[0].startPoll(1, 8);
            this.openListen();
        } catch (e) {
            console.log(e);
            this.options.onError(e);
        }
    }

    openListen() {
        this.device.interfaces[0].endpoints[0].on("data", dataBuf => {
            let buf = Buffer.from(dataBuf);
            if (buf[3].toString(16) != undefined && buf[3].toString(16) != 0) {
                this.read += this.keymap[buf[3].toString(16)];
            } else {
                if (buf[2].toString(16) != undefined && buf[2].toString(16) != 0) {
                    if (buf[2].toString(16) != 28) {
                        this.read += this.keymap[buf[2].toString(16)];
                    } else {
                        if (this.options.lowerCase) {
                            this.options.onRead(this.read.toLocaleLowerCase())
                        } else {
                            this.options.onRead(this.read)
                        }
                        this.read = '';
                    }

                }
            }
        });
        this.device.interfaces[0].endpoints[0].on("error", err => this.options.onError(err));
    }

    getDeviceList(filtered) {
        if (filtered) {
            return usb.getDeviceList().map(d => {
                return { address: d.deviceAddress, idVendor: d.deviceDescriptor.idVendor, idProduct: d.deviceDescriptor.idProduct }
            }).sort((a, b) => a.address - b.address)
        }
        return usb.getDeviceList()
    }

    findDeviceByIds(idVendor, idProduct) {
        return usb.findByIds(idVendor, idProduct);
    }
}

module.exports = USBCardReader





