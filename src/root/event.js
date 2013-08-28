"use strict";

var m = require('../magic');

require('./').def('event', function (name, init) {
    return this.lazy(name, function () {
        var inner = m.event();
        
        if (init) {
            inner(init);
        }
        
        return inner;
    });
});
