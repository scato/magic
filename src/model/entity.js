"use strict";

var Root = require('../root');
var Json = require('./json');

function one(value) {
	value = value || null;
	
	return one.create(function () {
		if (arguments.length === 0) {
			return value;
		} else {
			value = arguments[0];
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
	
	return left;
};

function many(type, enter, exit) {
	var value = [];
	enter = enter || function () {};
	exit = exit || function () {};
	
	return many.create(function () {
		if (arguments.length === 0) {
			return value.slice();
		} else {
			var prev = value;
			var next = arguments[0];
			
    		if (!isArray(next) || type && next.some(function (entity) { return !entity.is(type); })) {
    			throw new Error('Type mismatch');
    		}
    		
			value = arguments[0];
			
    		prev.filter(function (entity) {
    			return next.indexOf(entity) === -1;
    		}).forEach(exit, this);
			
    		next.filter(function (entity) {
    			return prev.indexOf(entity) === -1;
    		}).forEach(enter, this);
    		
    		return this;
		}
	}, type);
}

many.create = function (left) {
	left.is = function (right) {
		return right === many;
	};
	
	left.bind = function () {
		return many.create(Function.prototype.bind.apply(left, arguments));
	};
	
	left.add = function (entity) {
		left.remove(entity);
		left(left().concat(entity));
	};
	
	left.remove = function (entity) {
		left(left().filter(function (any) {
			return any !== entity;
		}));
	};
	
	return left;
};

function isArray(value) {
	return Object.prototype.toString.call(value) === '[object Array]';
}

function add(array, value) {
	var tmp = many();
	tmp(array);
	tmp.add(value);
	return tmp();
}

function remove(array, value) {
	var tmp = many();
	tmp(array);
	tmp.remove(value);
	return tmp();
}

function reset(ref, value) {
	if (isArray(ref())) {
		ref(remove(ref(), value));
	} else {
		ref(null);
	}
}

function fixup(ref, value) {
	if (isArray(ref())) {
		ref(add(ref(), value));
	} else {
		ref(value);
	}
}

module.exports = Json(Root.create()).
    override('field', function (base) {
        return function (name, init) {
            this.fields(name);
            
            return base(name, init);
        };
    }).
    def('hasOne', function (type, name, inverse) {
    	return this.lazy(name, function () {
    		var value = null;
    		
    		return function () {
    			if (arguments.length === 0) {
    				return value;
    			} else {
    				var prev = value;
    				var next = arguments[0];
    				
    				if (next !== null && !next.is(type)) {
    					throw new Error('Type mismatch when assigning value to \'' + name + '\'');
    				}
    				
    				if (value === next) {
    					return this;
    				}
    				
    				value = next;
    				
    				if (inverse !== undefined && prev !== null) {
    					reset(prev.ref(inverse), this);
    				}
    				
    				if (inverse !== undefined && next !== null) {
    					fixup(next.ref(inverse), this);
    				}
    				
    				return this;
    			}
    		};
    	});
    }).
    def('hasMany', function (type, name, inverse) {
    	return this.lazy(name, function () {
    		var value;
    		
    		if (inverse) {
    			return many(type, function (enter) {
    				fixup(enter.ref(inverse), this);
    			}, function (exit) {
    				reset(exit.ref(inverse), this);
    			});
    		} else {
    			return many(type);
    		}
    	});
    });

