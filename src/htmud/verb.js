"use strict";

function verb(syntax, action) {
    return create(function (command, player) {
        var regexp = new RegExp('^' + syntax.replace(/this/, '(?:' + this.name() + ')') + '$');

        if (regexp.test(command)) {
            return action.bind(this, player);
        }

        return null;
    });
}

module.exports = verb;

function create(left) {
    left.is = function (right) {
        return right === verb;
    };

    return left;
}

