"use strict";

var magic = require('./');

function on(observable, affector) {
    var undo = magic.event();

    undo(observable(function (value) {
        undo(magic.action(affector(value)));
    }));

    return undo;
}

function once(observable, affector) {
    return on(observable.one(), affector);
}

function until(observable, listener) {
    var undo = magic.event();

    observable.merge(undo).one()(listener);

    return undo;
}

function during(interval, affector) {
    var undo = magic.event();

    undo(interval(function (value) {
        var cancel = affector(value);

        undo(cancel);

        return cancel;
    }));

    return undo;
}

function between(interval, affector) {
    var undo = magic.event();

    undo(until(interval.start(), affector()));

    undo(once(interval.end(), function () {
        return between(interval, affector);
    }));

    return undo;
}

exports.on      = on;
exports.once    = once;
exports.until   = until;
exports.during  = during;
exports.between = between;
