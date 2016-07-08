/**
 * Created by dave on 7/8/16.
 */
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * (C) Copyright 2013, TNO
 * Author: Eric Smekens
 */

var obdReader = require('bluetooth-obd');

var ObdReader = new obdReader();

ObdReader.on('dataReceived', function (data) {
    var currentDate = new Date();
    console.log(currentDate.getTime(), data);
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
ObdReader.autoconnect('OBD');

