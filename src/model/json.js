"use strict";

module.exports = function (Base) {
    return Base.
        list('fields').
        override('create', function (base) {
            return function () {
                var clone = base();
                
                clone.fields(this.fields());
                
                return clone;
            };
        }).
        def('fromJson', function (json) {
            var instance = this.create();
            
            this.fields().forEach(function (key) {
                if (json.hasOwnProperty(key)) {
                    // reassign so as to work with Value objects
                    instance = instance[key](json[key]);
                }
            });
            
            return instance;
        }).
        def('toJson', function () {
            var json = {};
            
            this.fields().forEach(function (key) {
                json[key] = this[key]();
            }.bind(this));
            
            return json;
        });
};

