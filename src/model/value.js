"use strict";

var Root = require('../root');
var Json = require('./json');

function fixed(name, value) {
    return function () {
        if (arguments.length === 0) {
            return value;
        } else {
            var clone = this.create();
            
            clone[name] = fixed(name, arguments[0]);
            
            return clone;
        }
    };
}

module.exports = Json(Root.create()).create().
    override('field', function (base) {
        return function (name, init) {
            // register field for use with fromJson and toJson
            this.fields(name);
            
            var value = init ? init() : undefined;
            
            return this.def(name, fixed(name, value));
        };
    });

