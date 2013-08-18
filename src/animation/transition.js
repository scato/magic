"use strict";

var Root = require('../root');

module.exports = Root.create().
    def('linear', function (x) {
        return x;
    }).
    def('sineIn', function (x) {
        return Math.sin(x * Math.PI / 2);
    }).
    def('sineOut', function (x) {
        return 1 - Math.sin((1 - x) * Math.PI / 2);
    }).
    def('stepIn', function (x) {
        return x > 0;
    }).
    def('stepOut', function (x) {
        return x === 1;
    }).
    field('duration').
    field('timing').
    def('signal', function () {
        var duration = this.duration();
        var timing = this.timing();

        return function (t) {
            return timing(Math.max(0, Math.min(t / duration, 1)));
        };
    });
