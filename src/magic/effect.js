"use strict";

var magic = require('./');

var exit = magic.event();
var undo = exit;

function have(cancel) {
    undo(cancel);
}

function on(observable, block) {
    var inner = undo;
    
    exit(observable(function (value) {
        var outer = undo;
        undo = inner;
        block(value);
        undo = outer;
    }));
}

function once(observable, block) {
    on(observable.one(), block);
}

function until(observable, block) {
    var inner = magic.event();
    var outer = undo;
    
    undo = inner;
    block();
    undo = outer;
    
    observable(inner);
    undo(inner);
}

function during(interval, block) {
    var outer = undo;
    
    outer(interval(function (value) {
        var inner = magic.event();
        
        outer(inner);
        
        undo = inner;
        block(value);
        undo = outer;
        
        return inner;
    }));
}

function between(interval, block) {
    until(interval.start(), block);

    once(interval.end(), function () {
        between(interval, block);
    });
}

exports.exit    = exit;

exports.have    = have;
exports.on      = on;
exports.once    = once;
exports.until   = until;
exports.during  = during;
exports.between = between;

