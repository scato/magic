"use strict";

var m = require('../magic');

require('./').def('dynamic', function (name, init) {
    return this.lazy(name, function () {
        return init ? m.dynamic(init()) : m.dynamic();
    });
});
