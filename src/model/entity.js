"use strict";

var Root = require('../root');
var Json = require('./json');

module.exports = Json(Root.create().
    list('fields').
    override('field', function (base) {
        return function (name, init) {
            this.fields(name);
            
            return base(name, init);
        };
    }).
    override('create', function (base) {
        return function () {
            var clone = base();
            
            clone.fields(this.fields());
            
            return clone;
        };
    }));

