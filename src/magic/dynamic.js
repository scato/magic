"use strict";

var magic = require('./');

function dynamic(initial) {
    var modifiers = magic.list();

    return create(function () {
        if (arguments.length === 0) {
            return modifiers().reduce(function (initial, modifier) {
                return modifier(initial);
            }, initial);
        } else {
            return modifiers(arguments[0]);
        }
    });
}

module.exports = dynamic;

function create(left) {
    left.is = function (right) {
        return right === dynamic;
    };

    left.bind = function () {
        return create(Function.prototype.bind.apply(left, arguments));
    };

    return left;
}
