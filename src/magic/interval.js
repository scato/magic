"use strict";

var magic = require('./');

function interval(left) {
    left.start = function () {
        return magic.observable(function (listener) {
            return left(function (value) {
                listener();

                return function () {
                };
            });
        });
    };

    left.end = function () {
        var end = magic.event();

        left(function () {
            return end;
        });

        return end;
    };

    left.or = function (right) {
        var start = left.start().
            merge(right.start());

        var end = left.end().between(right).
            merge(right.end().between(left));

        return start.til(end);
    };

    left.and = function (right) {
        var start = left.start().during(right).
            merge(right.start().during(left));

        var end = left.end().
            merge(right.end());

        return start.til(end);
    };

    return left;
}

module.exports = interval;