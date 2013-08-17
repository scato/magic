"use strict";

var magic = require('./');

function list(value) {
    var elements = magic.field(value || []);

    return create(function () {
        if (arguments.length === 0) {
            return elements().slice();
        } else if(arguments[0] instanceof Array) {
            return elements.apply(this, arguments);
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
    });
}

function create(left) {
    left.is = function (right) {
        return right === list;
    };

    left.bind = function () {
        return create(Function.prototype.bind.apply(left, arguments));
    };

    return left;
}

module.exports = list;
