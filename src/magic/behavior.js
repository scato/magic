"use strict";

var magic = require('./');

function behavior(signal) {
    return create(function () {
        if (typeof arguments[0] === 'function') {
            signal = arguments[0];

            return this;
        } else {
            return signal(arguments[0]);
        }
    });
}

function create(left) {
    left.is = function (right) {
        return right === behavior;
    };

    left.bind = function () {
        return create(Function.prototype.bind.apply(left, arguments));
    };

    left.map = function (lambda) {
        return function (t) {
            return lambda(left(t));
        };
    };

    return left;
}

module.exports = behavior;
