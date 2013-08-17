"use strict";

var m = require('../magic');

require('./').def('field', function (name) {
    return this.lazy(name, function () {
        return m.field();
    });
});
