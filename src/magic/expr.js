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
        
        // the on-effect in the reactive getter is valid until next change
        change(magic.effect.permanent(function () {
            value = evaluate();
        }));
        
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
