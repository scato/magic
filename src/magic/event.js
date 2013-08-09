"use strict";

var magic = require('./');

function event() {
    var listeners = magic.list();

    return magic.observable(function () {
        if (typeof arguments[0] === 'function') {
            return listeners(arguments[0]);
        } else {
            var value = arguments[0];

            listeners().forEach(function (listener) {
                listener(value);
            });
        }
    });
}

module.exports = event;
