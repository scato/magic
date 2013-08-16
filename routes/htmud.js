var game = require('../src/htmud/game'),
    _    = require('underscore');

exports.main = function (req, res) {
    if (req.session.player) {
        res.render('htmud/main.jade', { title: 'HTMUD' });
    } else {
        res.redirect('/htmud/login');
    }
};

exports.loginForm = function (req, res) {
    res.render('htmud/login.jade', { title: 'HTMUD' });
};

exports.login = function (req, res) {
    var player;

    if (player = game.findPlayer(req.body.name)) {
        req.session.player = player;
        res.redirect('/htmud/main');
    } else {
        res.render('htmud/login.jade', { title: 'HTMUD', error: 'Player not found' });
    }
};

exports.connect = function (socket) {
    socket.emit('tell', '<div>Welcome</div>');
    socket.on('command', function (data) {
        socket.emit('tell', '<div>' + _.escape(data) + '</div>');
    });
};
