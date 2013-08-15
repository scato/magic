var $ = self.jQuery;

require('../magic/jquery');

var socket = io.connect('http://192.168.1.74:3000');

var tell = socket.on.bind(socket, 'tell');
var command = socket.emit.bind(socket, 'command');

var log = $('.console').append.bind($('.console'));
var focus = $('.command input[type="text"]').event('focus');
var value = $('.command input[type="text"]').field('value');
var submit = $('.command input[type="submit"]').event('click');

function echo(text) {
    log('<div>&gt;' + _.escape(text) + '</div>')
}

tell(log);

submit(function () {
    echo(value());
    command(value());
    value('');
});

focus();
