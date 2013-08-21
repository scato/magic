"use strict";

var magic = require('./');

var exit = magic.event();
var undo = exit;

function have(cancel) {
    undo(cancel);
}

function on(observable, block) {
    var outer = undo;
    
    outer(observable(function (value) {
        var inner = permanent(function () {
            block(value);
        });
        
        outer(inner);
    }));
}

function once(observable, block) {
    on(observable.one(), block);
}

function until(observable, block) {
    var inner = permanent(function () {
        block();
    });
    
    observable(inner);
    undo(inner);
}

function during(interval, block) {
    var outer = undo;
    
    outer(interval(function (value) {
        var inner = permanent(function () {
            block(value);
        });
        
        outer(inner);
        
        return inner;
    }));
}

function between(interval, block) {
    until(interval.start(), block);

    once(interval.end(), function () {
        between(interval, block);
    });
}

function permanent(block) {
    var inner = magic.event();
    var outer = undo;
    
    undo = inner;
    block();
    undo = outer;
    
    return inner;
}

exports.between   = between;
exports.during    = during;
exports.exit    = exit;
exports.have      = have;
exports.on        = on;
exports.once      = once;
exports.permanent = permanent;
exports.until     = until;

