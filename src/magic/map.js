"use strict";

var magic = require('./');

function map(values) {
    values = values || {};

    return create(function () {
        if (arguments.length === 0) {
            return values;
        } else if (typeof arguments[0] === 'string') {
            var key = arguments[0];

            if (arguments.length === 2) {
                values[key] = arguments[1];

                return this;
            } else {
                return values[key];
            }
        } else {
            values = arguments[0];

            return this;
        }
    });
}

function create(left) {
    left.is = function (right) {
        return right === map;
    };

    left.bind = function () {
        return create(Function.prototype.bind.apply(left, arguments));
    };

    return left;
}

module.exports = map;
