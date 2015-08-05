var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var five = require('johnny-five');
var board = new five.Board();
var oldAng = 90;
var panServo;
var tiltServo;
var button;
var led;
var fsr;

app.disable('x-powered-by');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://' + req.headers.host + ':8000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

app.use('/', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

server.listen(3000, '127.0.0.1');

board.on('ready', function() {
    led = new five.Led(11);
	button = new five.Button(2);
    panServo = new five.Servo(9);
    tiltServo = new five.Servo(10);

    board.repl.inject({
        button: button,
        servo: [panServo, tiltServo],
        led: led
    });

    panServo.sweep();
    tiltServo.sweep();
    led.brightness(0);

    this.wait(5000, function(){
        panServo.stop();
        panServo.to(oldAng);
        panServo.stop();

        tiltServo.stop();
        tiltServo.to(oldAng);
        tiltServo.stop();
    });

    // "down" the button is pressed
	button.on('down', function() {
		console.log('down');
		led.brightness(255);
	});

	// "up" the button is released
	button.on('up', function() {
		console.log('up');
		led.brightness(0);
	});

    // Create a new `fsr` hardware instance.
    fsr = new five.Sensor({
      pin: "A5",
      freq: 25
    });

    // Scale the sensor's value to the LED's brightness range
    fsr.scale([0, 255]).on("data", function() {

      // set the led's brightness based on force
      // applied to force sensitive resistor

      led.brightness(this.value);
    //   console.log(this.value);
    });

    io.on('connection', function (socket) {
        console.log('connection hit');
        socket.on('changePan', function(ang, control) {
            deltAng = oldAng - ang;
            oldAng = ang;
            panServo.step(deltAng);
            console.log('pan: ', oldAng, control);
        });

        socket.on('changeTilt', function(ang, control) {
            deltAng = oldAng - ang;
            oldAng = ang;
            tiltServo.step(deltAng);
            console.log('tilt: ', oldAng, control);
        });

        socket.on('buttonDown', function() {
            console.log('down');
    		led.brightness(255);
        });

        socket.on('buttonUp', function() {
            console.log('up');
    		led.brightness(0);
        });
    });
});
