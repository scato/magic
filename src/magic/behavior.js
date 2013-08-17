"use strict";

var magic = require('./');

function behavior(signal) {
    return create(function () {
        if (typeof arguments[0] === 'function') {
            signal = arguments[0];
        } else {
            return signal(arguments[0]);
        }
    });
}

function create(left) {
    left.is = function (right) {
        return right === behavior;
    };

    return left;
}

module.exports = behavior;
