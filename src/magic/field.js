"use strict";

function field(value) {
    return function () {
        if (arguments.length === 0) {
            return value;
        } else {
            value = arguments[0];

            return this;
        }
    };
}

module.exports = field;
