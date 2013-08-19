"use strict";

var Root = require('../root'),
    behavior = require('../magic').behavior;

var Control = module.exports = Root.create().
    behavior('time', function () {
        return function () { return Date.now(); };
    }).
    def('shuttle', function (active, duration) {
        var progress = behavior(function () {
            return 0;
        });

        active.start()(function () {
            var now = Control.time();
            var last = progress(now);

            progress(function (t) {
                return Math.min(last + (t - now), duration);
            });
        });

        active.end()(function () {
            var now = Control.time();
            var last = progress(now);

            progress(function (t) {
                return Math.max(0, last - (t - now));
            });
        });

        return progress;
    });
