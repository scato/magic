"use strict";

var Root = require('../root');
var Json = require('./json');

function one(type, enter, exit) {
	var value = null;
	enter = enter || function () {};
	exit = exit || function () {};
	
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
			
			if (prev !== next) {
				if (prev !== null) {
					exit.call(this, prev);
				}
				
				if (next !== null) {
					enter.call(this, next);
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
		
	left.revert = function (entity) {
		left(null);
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
    		
			value = next;
			
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
		left(left().filter(function (any) {
			return any !== entity;
		}).concat(entity));
	};
	
	left.remove = function (entity) {
		left(left().filter(function (any) {
			return any !== entity;
		}));
	};
	
	left.fixup = function (entity) {
		left.add(entity);
	};
	
	left.revert = function (entity) {
		left.remove(entity);
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
	ref.revert(value);
}

function fixup(ref, value) {
	ref.fixup(value);
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
    		var value;
    		
    		if (inverse) {
	    		return one(type, function (enter) {
	    			fixup(enter.ref(inverse), this);
	    		}, function (exit) {
    				reset(exit.ref(inverse), this);
	    		});
    		} else {
	    		return one(type);
    		}
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

