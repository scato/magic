"use strict";

var Root = require('../root');

module.exports = Root.create().
    behavior('time', function () {
        return function () { return Date.now(); };
    });