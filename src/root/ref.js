"use strict";

require('./').def('ref', function (name) {
    return this[name].bind(this);
});
