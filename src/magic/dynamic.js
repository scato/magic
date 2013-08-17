"use strict";

var magic = require('./');

function dynamic(initial) {
    var modifiers = magic.list();

    return function () {
        if (arguments.length === 0) {
            return modifiers().reduce(function (initial, modifier) {
                return modifier(initial);
            }, initial);
        } else {
            return modifiers(arguments[0]);
        }
    };
}

module.exports = dynamic;
