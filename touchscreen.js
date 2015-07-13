var five = require('johnny-five');
var board = new five.Board();
var temporal = require('temporal');

board.on('ready', function() {
    console.log('The board is connected, Master.');

    var y1 = new five.Pin('A0');
    var x2 = new five.Pin('A1');
    var y2 = new five.Pin('A2');
    var x1 = new five.Pin('A3');
    var x = (function readX() {
        y1.mode(0);
        x2.mode(1);
        y2.mode(0);
        x1.mode(1);

        x2.low();
        x1.high();

        // pause to allow lines to power up
        console.log('readX function');
        setTimeout(function() {
            console.log('readX Timeout');
            five.Pin.read(y1, function(error, value) {
                return value;
            });
        }, 500);
    })();

    var y = (function readY() {
        y1.mode(1);
        x2.mode(0);
        y2.mode(1);
        x1.mode(0);

        y1.low();
        y2.high();

        // pause to allow lines to power up
        console.log('readY function');
        setTimeout(function() {
            console.log('readY Timeout');
            five.Pin.read(x2, function(error, value) {
                return value;
            });
        }, 500);
    })();

    temporal.loop(500, function(loop) {
        console.log('in temporal loop');
            console.log("x: ", x);
            console.log("y: ", y);
            // console.log("x: ", x - 100);
            // console.log("y: ", y - 130);
        if (x < 1000 & y < 1000) {
        }
    });
});
