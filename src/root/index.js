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
    def('lazy', function (name, factory) {
        var root = this;
        var inner;

        return this.def(name, function () {
            if (this === root) {
                if (inner === undefined) {
                    inner = factory();
                }

                return inner.apply(this, arguments);
            }

            if (!this.hasOwnProperty(name)) {
                this.lazy(name, factory);
            }

            return this[name].apply(this, arguments);
        });
    }).
    def('field', function (name) {
        return this.lazy(name, function () {
            return m.field();
        });
    });
