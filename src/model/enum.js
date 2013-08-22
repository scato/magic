"use strict";

var Root = require('../root');

module.exports = Root.create().
    list('names').
    override('create', function (base) {
        return function () {
            var names = Array.prototype.slice.call(arguments);
            var clone = base();
            
            clone.names(this.names());
            
            // first add all the names to the list
            names.forEach(function (name) {
                clone.names(name);
            });
            
            // then make clones which have copies of this list
            names.forEach(function (name) {
                clone[name] = clone.create();
            });
            
            return clone;
        };
    }).
    def('fromJson', function (json) {
        var instance = null;
        
        this.names().forEach(function (name) {
            if (json === name) {
                instance = this[name];
            }
        }.bind(this));
        
        return instance;
    }).
    def('toJson', function () {
        var json = null;
        
        this.names().forEach(function (name) {
            if (this === this[name]) {
                json = name;
            }
        }.bind(this));
        
        return json;
    });

