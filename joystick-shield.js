var five = require('johnny-five');
var board = new five.Board();
var button;
var button2;
var led;
var events = [];
var looper;
var stopLoop = false;
var triggerServo;

board.on('ready', function() {
	led = new five.Pin(13);
	// Create a new `button` hardware instance.
	// This example allows the button module to
	// create a completely default instance
	button = new five.Button({
		pin: 4,
		isPullup: true
	});
	// button2 = new five.Button(3);

	// var servo = new five.Servo(10);
	// triggerServo = new five.Servo({
	// 		// id: "triggerServo",     // User defined id
	// 		pin: 10,           // Which pin is it attached to?
	// 		type: "standard",  // Default: "standard". Use "continuous" for continuous rotation servos
	// 		range: [90, 180],    // Default: 0-180
	// 		fps: 100,          // Used to calculate rate of movement between positions
	// 		invert: false,     // Invert all specified positions
	// 		// startAt: 90,       // Immediately move to a degree
	// 		specs: {           // Is it running at 5V or 3.3V?
	// 			speed: five.Servo.Continuous.speeds["@5.0V"]
	// 		}
	// });

	// Inject the `button` hardware into
	// the Repl instance's context;
	// allows direct command line access
	// this.repl.inject({
	// 	servo: triggerServo
	// });

	// Button Event API


	// triggerServo.max();
	var stepper = new five.Stepper({
	type: five.Stepper.TYPE.DRIVER,
	stepsPerRev: 200,
	pins: {
	step: 2,
	dir: 3
	}
	});

	// Make 10 full revolutions counter-clockwise at 180 rpm with acceleration and deceleration
	stepper.rpm(180).ccw().accel(1600).decel(1600).step(2000, function() {

	console.log("Done moving CCW");

	// once first movement is done, make 10 revolutions clockwise at previously
	//      defined speed, accel, and decel by passing an object into stepper.step
	stepper.step({
	steps: 2000,
	direction: five.Stepper.DIRECTION.CW
	}, function() {
	console.log("Done moving CW");
	});
	});
	// "down" the button is pressed
	button.on('down', function() {
		console.log('down');
		// triggerServo.min();
		// led.high();
	});


	// button.on('up', function() {
	// 	console.log('derp');
	// 	led.low();
	// 	triggerServo.sweep();
	// });

	var joystick = new five.Joystick({
      pins: ["A0", "A1"],
      invertY: true
    });

    joystick.on("change", function() {
      console.log("Joystick");
      console.log("  x : ", this.x);
      console.log("  y : ", this.y);
      console.log("--------------------------------------");
    });

});
