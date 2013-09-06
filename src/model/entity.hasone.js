"use strict";

var Entity = require('./entity');

function one(type, inverse) {
	var value = null;
	
	return one.create(function () {
		if (arguments.length === 0) {
			return value;
		} else {
			var prev = value;
			var next = arguments[0];
			
			if (next !== null && type && !next.is(type)) {
				throw new Error('Type mismatch');
			}
			
			value = next;
			
			if (inverse && prev !== next) {
				if (prev !== null) {
					prev.ref(inverse).revert(this);
				}
				
				if (next !== null) {
					next.ref(inverse).fixup(this);
				}
			}
			
			return this;
		}
	});
}

one.create = function (left) {
	left.is = function (right) {
		return right === one;
	};
	
	left.bind = function () {
		return one.create(Function.prototype.bind.apply(left, arguments));
	};
	
	left.fixup = function (entity) {
		left(entity);
	};
		
	left.revert = function () {
		left(null);
	};
	
	return left;
};

Entity.
    def('hasOne', function (type, name, inverse) {
	if (!(type.is && type.is(Entity))) {
		throw new Error("Type should be an Entity");
	}
	
    	return this.lazy(name, function () {
    		return one(type, inverse);
    	});
    });

