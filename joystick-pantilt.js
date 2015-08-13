var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function() {
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
