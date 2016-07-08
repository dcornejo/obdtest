/**
 * Created by dave on 7/8/16.
 */
/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <dave@dogwood.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return Dave Cornejo
 * ----------------------------------------------------------------------------
 */

var obdReader = require('bluetooth-obd');

var ObdReader = new obdReader();

ObdReader.on('dataReceived', function (data) {
    var currentDate = new Date();
    console.log(currentDate.getTime());
    console.log(data);
});

ObdReader.on('connected', function () {
    this.addPoller("vss");
    this.addPoller("rpm");

    this.startPolling(1000);
});

ObdReader.on('error', function (err) {
    console.log('ObdReader Error: ' + err);
});

ObdReader.on('debug', function (data) {
    console.log('ObdReader Debug: ' + data);
});

// Use first device with 'obd' in the name
ObdReader.autoconnect('obd');

