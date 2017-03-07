#!/usr/bin/env node

//
// DCS Zephyr BioHarness 3 Data Source
//

"use strict";

let serialObd2Device = false;
let debugMe = false;

// =======================================

let getOpt = require('node-getopt');
const fs = require('fs');

let getopt = new getOpt([
    ['i', 'interface=', 'specify device interface'],
    ['d', 'debug', 'debug mode'],
    ['h', 'help', 'display this help']
]);

getopt.setHelp(
    "Usage: node index.js [OPTION]\n\n" + "[[OPTIONS]]\n"
);

let cmdOptions = getopt.parseSystem(process.argv.slice(2));

if (cmdOptions.options.help) {
    getopt.showHelp();
    process.exit();
}

if (cmdOptions.options.debug) {
    debugMe = true;
}

if (cmdOptions.options.interface) {
    serialObd2Device = fs.realpathSync(cmdOptions.options.interface);
}
else {
    console.log('must specify an interface');
    process.exit();
}

// =======================================

// Serial/USB OBD-II READER

let OBDReader = require('serial-obd');

let serialOBDReader = new OBDReader(serialObd2Device, {
    baudrate: 115200
});

function addX(x, pid) {
    x.addPoller(pid);
}

serialOBDReader.on('connected', function () {

    // ALTERNATE 1
    this.addPoller("vss");
    this.startPolling(1000); //Request all values each second.
    setTimeout(addX(this, "rpm"), 125);
    setTimeout(addX(this, "load_pct"), 250);
    // END ALTERNATE 1

    // ALTERNATE 2
    // this.addPoller("vss");
    // this.addPoller("rpm");
    // this.addPoller("load_pct");
    // this.startPolling(1000);
    // END ALTERNATE 2

    // ALTERNATE 3
    // this.addPoller("vss");
    // this.addPoller("rpm");
    // this.addPoller("load_pct");
    // this.startPolling(2000);
    // END ALTERNATE 3


});

serialOBDReader.on('dataReceived', function (data) {
    let ts = new Date().valueOf();

    // ALTERNATE 1
    console.log(ts + ',' + JSON.stringify(data));
    // END ALTERNATE 1

    // ALTERNATE 2
    // console.log(ts);
    // console.dir(data);
    // END ALTERNATE 2
});

// Use first device with 'obd' in the name
try {
    serialOBDReader.connect(serialObd2Device);
}
catch (err) {
    console.log('OBD-II connect: ' + err.context);
}

console.log('running');
