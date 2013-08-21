"use strict";

require('./').def('override', function (name, factory) {
    if (!(name in this)) {
        throw new Error("Cannot override non-existent method '" + name + "'");
    }

    if (this.hasOwnProperty(name)) {
        throw new Error("The method '" + name + "' already exists on this prototype");
    }

    var base = this[name];

    this[name] = function () {
        return factory(base.bind(this)).apply(this, arguments);
    };

    return this;
});
