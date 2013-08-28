"use strict";

var magic = require('./');

function event() {
    var listeners = magic.list();

    return create(function () {
        if (typeof arguments[0] === 'function') {
            return listeners(arguments[0]);
        } else {
            var value = arguments[0];

            listeners().forEach(function (listener) {
                listener.call(this, value);
            }, this);
            
            return this;
        }
    });
}

function create(left) {
	left = magic.observable(left);
	
	left.is = function (right) {
		return right === event;
	};

    left.bind = function () {
        return create(Function.prototype.bind.apply(left, arguments));
    };
	
	return left;
}

module.exports = event;
