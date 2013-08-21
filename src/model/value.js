"use strict";

var Root = require('../root');

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

module.exports = Root.create().
    override('field', function (base) {
        return function (name, init) {
            var value = init();
            
            return this.def(name, fixed(name, init()));
        };
    });

