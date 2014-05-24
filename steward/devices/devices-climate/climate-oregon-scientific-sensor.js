// Oregon Scientific Thermo-Hygro Sensors: http://www.oregonscientificstore.com/oregon_scientific/sf_sub.asp?mfgname=Oregon+Scientific&store=1&set=06_wcos

var util        = require('util')
  , devices     = require('./../../core/device')
  , steward     = require('./../../core/steward')
  , utility     = require('./../../core/utility')
  , climate     = require('./../device-climate')
  , sensor      = require('./../device-sensor')
  ;


// var logger = climate.logger;


var Sensor = exports.Device = function(deviceID, deviceUID, info) {
  var param, self;

  self = this;

  self.whatami = info.deviceType;
  self.deviceID = deviceID.toString();
  self.deviceUID = deviceUID;
  self.name = info.device.name;
  self.getName();

  self.info = {};
  for (param in info.params) {
    if ((info.params.hasOwnProperty(param)) && (!!info.params[param])) self.info[param] = info.params[param];
  }
  sensor.update(self.deviceID, info.params);

  self.status = 'present';
  self.changed();

  utility.broker.subscribe('actors', function(request, taskID, actor, perform, parameter) {
    if (actor !== ('device/' + self.deviceID)) return;

    if (request === 'perform') return devices.perform(self, taskID, perform, parameter);
  });
};
util.inherits(Sensor, climate.Device);
Sensor.prototype.perform = devices.perform;


Sensor.prototype.update = function(self, params, status) {
  var param, updateP;

  updateP = false;
  if ((!!status) && (status !== self.status)) {
    self.status = status;
    updateP = true;
  }
  for (param in params) {
    if ((!params.hasOwnProperty(param)) || (!params[param]) || (self.info[param] === params[param])) continue;

    self.info[param] = params[param];
    updateP = true;
  }
  if (updateP) {
    self.changed();
    sensor.update(self.deviceID, params);
  }
};

exports.start = function() {
  steward.actors.device.climate['oregon-scientific'] = steward.actors.device.climate['oregon-scientific'] ||
      { $info     : { type: '/device/climate/oregon-scientific' } };

  steward.actors.device.climate['oregon-scientific'].meteo =
      { $info     : { type       : '/device/climate/oregon-scientific/meteo'
                    , observe    : [ ]
                    , perform    : [ ]
                    , properties : { name          : true
                                   , status        : [ 'present' ]
                                   , lastSample    : 'timestamp'
                                   , temperature   : 'celsius'
                                   , humidity      : 'percentage'
                                   , batteryLevel  : 'percentage'
                                   , rssi          : 's8'
                                   , rainRate      : 'mm/h'
                                   , rainTotal     : 'mm'
                                   , windAverage   : 'm/s'
                                   , windGust      : 'm/s'
                                   , windDirection : 'degrees'
                                   }
                    }
      , $validate : { perform    : devices.validate_perform
                    }
      };
  devices.makers['/device/climate/oregon-scientific/meteo'] = Sensor;
};
