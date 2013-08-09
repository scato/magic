"use strict";

var magic = require('./');

function phase() {
    var affectors = magic.list();

    return magic.interval(function () {
        if (typeof arguments[0] === 'function') {
            return affectors(arguments[0]);
        } else {
            var value = arguments[0];
            var undo = magic.event();

            affectors().forEach(function (affector) {
                undo(magic.action(affector(value)));
            });

            return undo;
        }
    });
}

module.exports = phase;