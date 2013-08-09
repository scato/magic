var Player = require('./player');

exports.findPlayer = function (name) {
    return players.filter(function (player) {
        return player.name() === name;
    });
};

var alatar = Player.create().
    name('Alatar').
    image('Alatar.jpg');

var anborn = Player.create().
    name('Anborn').
    image('Anborn.jpg');

var players = [
    alatar,
    anborn
];