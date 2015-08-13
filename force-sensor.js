var five = require('johnny-five');
var board = new five.Board();
var fsr;

board.on('ready', function() {
    led = new five.Led(11);

    // Create a new `fsr` hardware instance.
    fsr = new five.Sensor({
        pin: "A5",
        freq: 25
    });

    // Scale the sensor's value to the LED's brightness range
    fsr.scale([0, 255]).on('data', function() {

      // set the led's brightness based on force
      // applied to force sensitive resistor
      led.brightness(this.value);
    });
});
