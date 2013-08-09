"use strict";

var magic = require('./');

function list(value) {
    var elements = magic.field(value || []);

    return function () {
        if (arguments.length === 0) {
            return elements().slice();
        } else if(arguments[0] instanceof Array) {
            return elements(arguments[0]);
        } else {
            var array = elements();
            var element = arguments[0];
            var undone = false;

            array.push(element);

            return function () {
                if (!undone) {
                    array.splice(array.indexOf(element), 1);

                    undone = true;
                }
            };
        }
    };
}

module.exports = list;
