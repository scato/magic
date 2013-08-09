var Player = require('./player');

exports.findPlayer = function (name) {
    return players.filter(function (player) {
        return player.name() === name;
    })[0];
};

var Alatar = Player.create().
    name('Alatar').
    image('Alatar.jpg');

var Anborn = Player.create().
    name('Anborn').
    image('Anborn.jpg');

var players = [
    Alatar,
    Anborn
];
