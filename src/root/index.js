var m = require('../magic');

module.exports = {
        def: function (name, value) {
            if (name in this) {
                throw new Error("The method 'foo' already exists on this prototype");
            }

            this[name] = value;

            return this;
        }
    }.
    def('create', function () {
        return Object.create(this);
    }).
    def('ref', function (name) {
        return this[name].bind(this);
    }).
    def('lazy', function (name, factory) {
        var root = this;
        var inner;

        function init(context) {
            if (context === root) {
                if (inner === undefined) {
                    inner = factory();
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
    }).
    def('field', function (name) {
        return this.lazy(name, function () {
            return m.field();
        });
    }).
    def('override', function (name, factory) {
        if (!(name in this)) {
            throw new Error("Cannot override non-existent method '" + name + "'");
        }

        if (this.hasOwnProperty(name)) {
            throw new Error("The method 'foo' already exists on this prototype");
        }

        var base = this[name];

        this[name] = function() {
            factory(base.bind(this)).apply(this, arguments);
        };

        return this;
    });
