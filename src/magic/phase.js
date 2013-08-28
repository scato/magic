"use strict";

var magic = require('./');

function phase() {
    var affectors = magic.list();

    return create(function () {
        if (typeof arguments[0] === 'function') {
            return affectors(arguments[0]);
        } else {
            var value = arguments[0];
            var undo = magic.event();

            affectors().forEach(function (affector) {
                undo(magic.action(affector.call(this, value)));
            }, this);

            return undo;
        }
    });
}

function create(left) {
	left = magic.interval(left);
	
	left.is = function (right) {
		return right === phase;
	};

    left.bind = function () {
        return create(Function.prototype.bind.apply(left, arguments));
    };
	
	return left;
}

module.exports = phase;