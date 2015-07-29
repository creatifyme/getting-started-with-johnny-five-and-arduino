var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function() {

	// Create a new `joystick` hardware instance.
	var joystick = new five.Joystick({
		//   [ x, y ]
		pins: ["A0", "A1"],
		// button extend
		button: {
			pin: 9,
			invert: false
		}
	});

	joystick.on("change", function() {
		console.log("Joystick");
		console.log("  x : ", this.x);
		console.log("  y : ", this.y);
		console.log("--------------------------------------");
	});
});
