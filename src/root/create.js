"use strict";

require('./').def('create', function () {
    var clone = Object.create(this);

    clone.base = this;

    return clone;
});
