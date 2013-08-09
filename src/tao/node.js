"use strict";

var fs = require('fs');
var vm = require('vm');

GLOBAL.self = GLOBAL;

self.importScripts = function () {
    var scripts = Array.prototype.slice.apply(arguments);

    scripts.forEach(function (script) {
        var code = fs.readFileSync(script);

        vm.runInThisContext(code, script);
    });
};
