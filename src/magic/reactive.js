"use strict";

var magic = require('./');

function reactive(value) {
    var change = magic.event();

    return function () {
        if(arguments.length === 0) {
            return value;
        } else if(typeof arguments[0] === 'function') {
            return change(arguments[0]);
        } else {
            change(value = arguments[0]);
        }
    };
}

module.exports = reactive;
