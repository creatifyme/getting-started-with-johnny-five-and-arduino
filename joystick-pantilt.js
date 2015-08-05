var five = require('johnny-five');
var board = new five.Board();
var temporal = require('temporal');
var button;
var led;
var events = [];
var looper;
var stopLoop = false;

board.on('ready', function() {
    led = new five.Pin(13);
	// Create a new `button` hardware instance.
	// This example allows the button module to
	// create a completely default instance
	button = new five.Button(2);

	looper = function() {
		temporal.loop(500, function(loop) {
			if (stopLoop) {
				this.stop();
			} else {
				led[loop.called % 2 === 0 ? 'high' : 'low']();
			}
		})
	};

	// Inject the `button` hardware into
	// the Repl instance's context;
	// allows direct command line access
	board.repl.inject({
		button: button
	});

	// Button Event API

	// "down" the button is pressed
	button.on('down', function() {
		console.log('down');
		led.high();
	});

	// "hold" the button is pressed for specified time.
	//        defaults to 500ms (1/2 second)
	//        set
	button.on('hold', function() {
		console.log('hold');

		stopLoop = false;
		looper();

		// Pin emits "high" and "low" events, whether it's
	    // input or output.
	    ['high', 'low'].forEach(function(state) {
	        led.on(state, function() {
	            if (events.indexOf(state) === -1) {
	                console.log("Event emitted for:", state, "on", this.addr);
	                events.push(state);
	            }
	        });
	    });
	});

	// "up" the button is released
	button.on('up', function() {
		console.log('up');
		stopLoop = true;
		looper();
		led.low();
	});

    var range = [
        0,
        170
    ];

    // Servo to control panning
    var pan = new five.Servo({
        pin: 9,
        range: range
    });

    // Servo to control tilt
    var tilt = new five.Servo({
        pin: 10,
        range: range
    });

    // Joystick to control pan/tilt
    // Read Analog 0, 1
    // Limit events to every 50ms
    var joystick = new five.Joystick({
        pins: [
            'A0',
            'A1'
        ],
        freq: 100
    });

tilt.center();
pan.center();

    joystick.on('change', function() {
        console.log('y: ', this.y);
        console.log('x: ', this.x);

        tilt.to(five.Fn.scale(this.y, -1, 1, 0, 170));
        pan.to(five.Fn.scale(this.x, -1, 1, 0, 170));
    });
});
