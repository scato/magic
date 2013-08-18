"use strict";

require('./').def = function (name, value) {
    if (name in this) {
        throw new Error("The method '" + name + "' already exists on this prototype");
    }

    this[name] = value;

    return this;
};
