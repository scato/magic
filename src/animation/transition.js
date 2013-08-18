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
    field('delay', function () { return 0; }).
    def('progress', function () {
        var duration = this.duration();
        var timing = this.timing();
        var delay = this.delay();

        return function (t) {
            return timing(Math.max(0, Math.min((t - delay) / duration, 1)));
        };
    }).
    def('signal', function (from, to) {
        var progress = this.progress();

        return function (t) {
            var f = progress(t);

            if (f === false) {
                return from;
            } else if (f === true) {
                return to;
            } else {
                return from + (to - from) * f;
            }
        };
    });
