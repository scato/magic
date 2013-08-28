"use strict";

var m = require('../magic');

require('./').def('reactive', function (name, init) {
    return this.lazy(name, function () {
        return init ? m.reactive(init()) : m.reactive();
    });
});
