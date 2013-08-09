"use strict";

var magic = require('./');

function observable(left) {
    left.map = function (lambda) {
        return magic.observable(function (listener) {
            return left(function (value) {
                listener(lambda(value));
            });
        });
    };

    left.filter = function (lambda) {
        return magic.observable(function (listener) {
            return left(function (value) {
                if (lambda(value)) {
                    listener(value);
                }
            });
        });
    };

    left.one = function () {
        return magic.observable(function (listener) {
            var undo = left(function (value) {
                listener(value);
                undo();
            });

            return undo;
        });
    };

    left.recycle = function () {
        var result = observable(function (observer) {
            var undo = left(function (value) {
                observer(value);

                undo = result(observer);
            });

            return function () {
                undo();
            };
        });

        return result;
    };

    left.merge = function (right) {
        return magic.observable(function (listener) {
            return magic.action.merge(left(listener), right(listener));
        });
    };

    left.delay = function (right) {
        return magic.observable(function (listener) {
            var values = [];

            return magic.action.merge(left(function (value) {
                values.push(value);
            }), right(function () {
                values.forEach(function (value) {
                    listener(value);
                });
            }));
        });
    };

    left.sample = function (right) {
        return magic.observable(function (listener) {
            var last;

            return magic.action.merge(left(function () {
                listener(last);
            }), right(function (value) {
                last = value;
            }));
        });
    };

    left.til = function (right) {
        return magic.interval(function repeat(affector) {
            return magic.effect.once(left, function (value) {
                return magic.action.merge(
                    magic.effect.until(right, affector(value)),
                    magic.effect.once(right, function () {
                        return repeat(affector);
                    })
                );
            });
        });
    };

    left.during = function (right) {
        return magic.observable(function (listener) {
            return magic.effect.during(right, function () {
                return left(listener);
            });
        });
    };

    left.between = function (right) {
        return magic.observable(function (listener) {
            return magic.effect.between(right, function () {
                return left(listener);
            });
        });
    };

    return left;
}

module.exports = observable;
