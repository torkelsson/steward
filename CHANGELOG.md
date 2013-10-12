ChangeLog
=======
	
## Release 1.1 - October 15 - TBD

### Steward 
- 307 redirect HTTP LAN traffic to HTTPS (may be disabled by setting place.strict to 'off')
- lastSample always calculated as appropriate
- correctly report Hue bulbs that didn't report color model
- slightly more robust SSDP parsing
- fix name of TSRP discovery module
- always allow HTTP access to index.xml for SSDP
- fix RPi access over LAN (no localhost)
- more robust TOTP checking
- various robustness fixes
- use latest release of noble for increased BLE robustness
- do not respond to SSDP requests from the steward
- place1.version reports commit SHA
    
### Things
- support Data Sensing Labs' Air Quality Sensor Mote
- support Ecobee's Smart SI Thermostat
- support Yoctopuce's hubs, climate sensors, and power LED    
- less aggressive polling of API for Tesla Motors
- allow nest and ecobee to report absent thermostats
	
### HTML5/D3 client
- support remote access via node-rendezvous2 package
- additional popover support
- improvements to CIE1931 and RGB color pickers
- improvements to home page layout
- various robustness fixes
- allow user to change device name in popover
    	
	
### Client examples
- HCHO sensor added to Grove AQ sensor array
- small robustness fixes to all Arduino clients
    
    	
## Release 1.0 - September 23, 2013 - 881e6ed337365bf5e8a97d9af55a8cf89de23a4a

Released to open source.