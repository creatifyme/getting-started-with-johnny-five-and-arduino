var socket = io('http://' + document.location.hostname + ':3000');
var notif;
var control;
var $angle_txt = $('#angle_txt');
var $angle_txt = $('#angle_txt2');

var $angle_slider = $('#angle_slider').on('change mousemove', function() {
	var ang = $angle_slider.val();
	control = 'mouse';
	socket.emit('changePan', ang, control);
	socket.on('returnAng',function(ang){
		console.log(ang);
	});
    $angle_txt.val($angle_slider.val());
});

var $angle_slider2 = $('#angle_slider2').on('change mousemove', function() {
	var ang = $angle_slider2.val();
	control = 'mouse';
	socket.emit('changeTilt', ang, control);
	socket.on('returnAng',function(ang){
		console.log(ang);
	});
    $angle_txt2.val($angle_slider2.val());
});

var $angle_txt = $('#angle_txt');
var $angle_slider = $('#angle_slider').keydown('change', function(e) {
	if (e.keyCode == 37 || e.keyCode == 39) {
		if (e.keyCode == 37) {
			control = 'left';
		};
		if (e.keyCode == 39) {
			control = 'right';
		};
		var ang = $angle_slider.val();
		socket.emit('changeAngle', ang, control);

		socket.on('returnAng', function(ang) {
			console.log(ang);
		});
	}

    $angle_txt.val($angle_slider.val());
});

var $angle_txt2 = $('#angle_txt2');
var $angle_slider2 = $('#angle_slider2').keydown('change', function(e) {
	if (e.keyCode == 37 || e.keyCode == 39) {
		if (e.keyCode == 37) {
			control = 'left';
		};
		if (e.keyCode == 39) {
			control = 'right';
		};
		var ang = $angle_slider.val();
		socket.emit('changeTilt', ang, control);

		socket.on('returnAng', function(ang) {
			console.log(ang);
		});
	}

    $angle_txt2.val($angle_slider2.val());
});

var $ledButtonDown = $('#ledButton').on('mousedown', function(){
	socket.emit('buttonDown');
});
var $ledButtonUp = $('#ledButton').on('mouseup', function(){
	socket.emit('buttonUp');
});
