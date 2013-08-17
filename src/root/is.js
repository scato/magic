"use strict";

require('./').def('is', function (prototype) {
    return prototype === this || prototype.isPrototypeOf(this);
});
