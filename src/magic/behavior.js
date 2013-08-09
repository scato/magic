"use strict";

var magic = require('./');

function modifier(initial) {
    if (typeof initial === 'function') {
        return initial;
    } else {
        return function () {
            return initial;
        };
    }
}

function behavior(value) {
    var modifiers = magic.list();
    var initial = modifier(value);

    return function () {
        if (arguments.length === 0) {
            return modifiers().reduce(function (initial, modifier) {
                return modifier(initial);
            }, initial());
        } else {
            return modifiers(modifier(arguments[0]));
        }
    };
}

module.exports = behavior;
