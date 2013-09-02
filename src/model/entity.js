"use strict";

var Root = require('../root');
var Json = require('./json');

function isArray(value) {
	return Object.prototype.toString.call(value) === '[object Array]';
}

function add(array, value) {
	// remove any occurrences, then add it
	return remove(array, value).concat([value]);
}

function remove(array, value) {
	return array.filter(function (element) {
		return element !== value;
	});
}

function reset(object, key, value) {
	if (isArray(object[key]())) {
		object[key](remove(object[key](), value));
	} else {
		object[key](null);
	}
}

function fixup(object, key, value) {
	if (isArray(object[key]())) {
		object[key](add(object[key](), value));
	} else {
		object[key](value);
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
    					reset(prev, inverse, this);
    				}
    				
    				if (inverse !== undefined && next !== null) {
    					fixup(next, inverse, this);
    				}
    				
    				return this;
    			}
    		};
    	});
    }).
    def('hasMany', function (type, name, inverse) {
    	return this.lazy(name, function () {
    		var value = [];
    		
    		return function () {
    			if (arguments.length === 0) {
    				return value.slice();
    			} else {
    				var prev = value;
    				var next = arguments[0];
    				
    				if (!isArray(next) || next.some(function (entity) { return !entity.is(type); })) {
    					throw new Error('Type mismatch when assigning value to \'' + name + '\'');
    				}
    				
    				value = next;
    				
    				var exit = prev.filter(function (entity) {
    					return next.indexOf(entity) === -1;
    				});
    				
    				var enter = next.filter(function (entity) {
    					return prev.indexOf(entity) === -1;
    				});
    				
    				if (inverse !== undefined) {
    					exit.forEach(function (entity) {
    						reset(entity, inverse, this);
    					}, this);
    				}
    				
    				if (inverse !== undefined) {
    					enter.forEach(function (entity) {
    						fixup(entity, inverse, this);
    					}, this);
    				}
    				
    				return this;
    			}
    		};
    	});
    });

