"use strict";

require('./').def('lazy', function (name, factory) {
    var root = this;
    var inner;

    function init(context) {
        if (context === root) {
            if (inner === undefined) {
                inner = factory.call(context);
            }

            return inner;
        }

        if (!context.hasOwnProperty(name)) {
            context.lazy(name, factory);
        }

        return context[name];
    }

    function outer() {
        var inner = init(this);

        return inner.apply(this, arguments);
    }

    outer.bind = function (context) {
        var inner = init(context);

        return inner.bind.apply(inner, arguments);
    };

    this[name] = outer;

    return this;
});
