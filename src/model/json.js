"use strict";

module.exports = function (Base) {
    return Base.
        def('fromJson', function (json) {
            var instance = this.create();
            
            this.fields().forEach(function (key) {
                if (json.hasOwnProperty(key)) {
                    instance[key](json[key]);
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

