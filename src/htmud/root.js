"use strict";

var Entity = require('../model/entity'),
    verb = require('./verb');

module.exports = Entity.create().
    field('name').
    lazy('verb', function () {
        var verbs = this.base.verb ? this.base.verb() : [];
        
        return function () {
            if (arguments.length === 0) {
                return verbs;
            } else if (arguments.length === 1) {
                var syntax = arguments[0];

                return verbs.map(function (el) {
                    return el.call(this, syntax);
                }, this).filter(function (el) {
                    return el !== null;
                });
            } else {
                var syntax = arguments[0];
                var action = arguments[1];

                verbs.push(verb(syntax, action));

                return this;
            }
        };
    });

