"use strict";

require('./').def('ref', function (name) {
    if (this[name] === undefined) {
        throw new Error("Object has no method '" + name + "'");
    }

    return this[name].bind(this);
});
