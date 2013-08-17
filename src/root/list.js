"use strict";

var m = require('../magic');

require('./').def('list', function (name, init) {
    return this.lazy(name, function () {
        return init ? m.list(init()) : m.list();
    });
});
