"use strict";

var m = require('../magic');

require('./').def('map', function (name, init) {
    return this.lazy(name, function () {
        return init ? m.map(init()) : m.map();
    });
});
