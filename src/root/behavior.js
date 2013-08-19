"use strict";

var m = require('../magic');

require('./').def('behavior', function (name, init) {
    return this.lazy(name, function () {
        return init ? m.behavior(init()) : m.behavior();
    });
});
