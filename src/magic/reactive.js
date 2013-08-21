"use strict";

var magic = require('./');

function reactive(value) {
    var change = magic.event();

    return create(function () {
        if(arguments.length === 0) {
            // if we are in the scope of an expr
            if (magic.expr.update) {
                var update = magic.expr.update;
                
                // trigger the scope when the value changes
                magic.effect.on(change, function () {
                    update();
                });
            }
            
            return value;
        } else if(typeof arguments[0] === 'function') {
            return change(arguments[0]);
        } else {
            change(value = arguments[0]);
        }
    });
}

function create(left) {
    left.is = function (right) {
        return right === magic.reactive;
    };
    
    return left;
}

module.exports = reactive;
