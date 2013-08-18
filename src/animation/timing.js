"use strict";

var Root = require('../root');

module.exports = Root.create().
    def('linear', function (from, to) {
        return function (progress) {
            return from + ((to - from) * progress);
        };
    }).
    def('sineIn', function (from, to) {
        var linear = this.linear(from, to);

        return function (progress) {
            return linear(Math.sin(progress * Math.PI / 2));
        };
    }).
    def('sineOut', function (from, to) {
        var linear = this.linear(from, to);

        return function (progress) {
            return linear(1 - Math.sin((1 - progress) * Math.PI / 2));
        };
    }).
    def('stepIn', function (from, to) {
        return function (progress) {
            return progress === 0 ? from : to;
        };
    }).
    def('stepOut', function (from, to) {
        return function (progress) {
            return progress !== 1 ? from : to;
        };
    });
