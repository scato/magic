var m = require('../magic');

module.exports = {
        def: function (name, value) {
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

        return this.def(name, outer);
    }).
    def('field', function (name) {
        return this.lazy(name, function () {
            return m.field();
        });
    });
