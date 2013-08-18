"use strict";

var Root = require('../root');

module.exports = Root.create().
    field('duration', function () { return 0; }).
    map('prop').
    def('frame', function (properties) {
        var prop = this.ref('prop');

        Object.keys(properties).forEach(function (key) {
            prop(key, function () {
                return properties[key];
            });
        });

        return this;
    }).
    def('tween', function (shape, duration) {
        this.duration(this.duration() + duration);

        return this;
    });
