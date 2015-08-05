var five = require('johnny-five');
var board = new five.Board();
var button;
var led;

board.on('ready', function() {
	led = new five.Led(11);
	// Create a new `button` hardware instance.
	// This example allows the button module to
	// create a completely default instance
	button = new five.Button(2);

	// Inject the `button` hardware into
	// the Repl instance's context;
	// allows direct command line access
	board.repl.inject({
		button: button,
		led: led
	});

	// Button Event API

	// "down" the button is pressed
	button.on('down', function() {
		console.log('down');
		led.brightness(255);
	});

	button.on('hold', function() {
		console.log('hold');
		led.blink(500);
	});

	// "up" the button is released
	button.on('up', function() {
		console.log('up');
		led.stop(); // Stops the blinking
		led.brightness(0);
	});
});
