var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function() {
    // LED is on pin 11
    // Create a standard `led` component instance
    var led = new five.Led(11);

    // "blink" the led in 500ms on-off phase periods
    led.blink(500);

    board.repl.inject({
        led: led
    });
});
