"use strict";

var m = require('../magic');

require('./').def('phase', function (name, init) {
    return this.lazy(name, function () {
        var inner = m.phase();
        
        if (init) {
            inner(init);
        }
        
        return inner;
    });
});
