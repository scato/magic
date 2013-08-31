"use strict";

var Root = require('../root');
var Json = require('./json');

function isArray(value) {
	return Object.prototype.toString.call(value) === '[object Array]';
}

function add(array, value) {
	array.push(value);
}

function remove(array, value) {
	var index = array.indexOf(value);
	
	if (index !== -1) {
		array.splice(index, 1);
	}
}

function reset(object, key, value) {
	if (isArray(object[key]())) {
		remove(object[key](), value);
	} else {
		object[key](null);
	}
}

function fixup(object, key, value) {
	if (isArray(object[key]())) {
		add(object[key](), value);
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
    		var elements = [];
    		
    		return function () {
    			if (arguments.length === 0) {
    				return elements;
    			} else {
    				elements = arguments[0];
    				
    				return this;
    			}
    		};
    	});
    });

