"use strict";

var m = require('../magic');

require('./').def('overrule', function (name, factory) {
    if (!(name in this)) {
        throw new Error("Cannot overrule non-existent method '" + name + "'");
    }

    var initial = this[name];
    var modifiers = m.dynamic(initial);

    this[name] = function () {;
        return modifiers().apply(this, arguments);
    };

    return modifiers(function (initial) {
        return function () {
            return factory(initial.bind(this)).apply(this, arguments);
        };
    });
});
