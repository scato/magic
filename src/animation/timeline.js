"use strict";

var Root = require('../root'),
    Transition = require('./transition');

module.exports = Root.create().
    field('duration', function () { return 0; }).
    field('transition').
    map('prop').
    def('frame', function (properties) {
        var prop = this.ref('prop');
        var transition = this.transition();

        Object.keys(properties).forEach(function (key) {
            var initial = prop(key);
            var value = properties[key];

            if (initial !== undefined && transition !== undefined) {
                var progress = transition.signal();

                prop(key, function (t) {
                    return initial(t) + (value - initial(t)) * progress(t);
                });
            } else {
                prop(key, function (t) {
                    return value;
                });
            }
        });

        return this;
    }).
    def('tween', function (timing, duration) {
        var transition = Transition.create().
            delay(this.duration()).
            duration(duration).
            timing(timing);

        this.duration(this.duration() + duration);
        this.transition(transition);

        return this;
    }).
    def('linear', function (duration) {
        return this.tween(Transition.linear, duration);
    }).
    def('sineIn', function (duration) {
        return this.tween(Transition.sineIn, duration);
    }).
    def('sineOut', function (duration) {
        return this.tween(Transition.sineOut, duration);
    }).
    def('stepIn', function (duration) {
        return this.tween(Transition.stepIn, duration);
    }).
    def('stepOut', function (duration) {
        return this.tween(Transition.stepOut, duration);
    });
