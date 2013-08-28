"use strict";

var magic = require('./');

function expr(evaluate) {
    var value;
    var change = magic.event();
    
    // this is how we update the expression
    function update() {
        // use this update function as a scope
        var outer = expr.update;
        var inner = update;
        
        // export the scope
        expr.update = inner;
        
        // evaluating this expr may trigger reactive getters
        // these getter apply on-effects to match the update function to change events
        var undo = magic.effect.permanent(function () {
            value = evaluate();
        });
        
        // fire the change for this new value (and cancel all previous on-effects)
        change(value);
        
        // the on-effects should be valid until next change
        change(undo);
        
        // revert the scope
        expr.update = outer;
    }
    
    // update now
    update();
    
    return create(function () {
        if(arguments.length === 0) {
            return value;
        } else if(typeof arguments[0] === 'function') {
            return change(arguments[0]);
        } else {
            throw new Error("Cannot set an expr");
        }
    });
}

function create(left) {
    left.is = function (right) {
        return right === magic.reactive;
    };
    
    return left;
}

module.exports = expr;
