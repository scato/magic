"use strict";

function field(value) {
    return create(function () {
        if (arguments.length === 0) {
            return value;
        } else {
            value = arguments[0];

            return this;
        }
    });
}

module.exports = field;

function create(left) {
    left.is = function (right) {
        return right === field;
    };

    left.bind = function () {
        return create(Function.prototype.bind.apply(left, arguments));
    };

    return left;
}
