"use strict";

var Root = require('../root');
var Json = require('./json');

function isArray(value) {
	return Object.prototype.toString.call(value) === '[object Array]';
}

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
		
	left.revert = function (entity) {
		left(null);
	};
	
	return left;
};

function many(type, inverse) {
	var value = [];
	
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
			
			if (inverse) {
	    		prev.filter(function (entity) {
    				return next.indexOf(entity) === -1;
    			}).forEach(function (entity) {
    				entity.ref(inverse).revert(this);
    			}, this);
				
	    		next.filter(function (entity) {
    				return prev.indexOf(entity) === -1;
    			}).forEach(function (entity) {
    				entity.ref(inverse).fixup(this);
    			}, this);
    		}
    		
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

module.exports = Json(Root.create()).
    override('field', function (base) {
        return function (name, init) {
            this.fields(name);
            
            return base(name, init);
        };
    }).
    def('hasOne', function (type, name, inverse) {
    	return this.lazy(name, function () {
    		return one(type, inverse);
    	});
    }).
    def('hasMany', function (type, name, inverse) {
    	return this.lazy(name, function () {
   			return many(type, inverse);
    	});
    });

