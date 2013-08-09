"use strict";

function action(value) {
    if (typeof value === 'function') {
        return value;
    } else {
        return function () {
        };
    }
}

action.merge = function (left, right) {
    return function () {
        left();
        right();
    };
}

module.exports = action;
