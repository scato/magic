"use strict";

var m = require('../magic');

require('./').def('field', function (name, init) {
    return this.lazy(name, function () {
        return init ? m.field(init()) : m.field();
    });
});
