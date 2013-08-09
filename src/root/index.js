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
    def('field', function (name) {
        return this.def(name, function () {
            if (!this.hasOwnProperty('_' + name)) {
                this['_' + name] = m.field();
            }

            if (arguments.length === 0) {
                return this['_' + name].apply(this, arguments);
            } else {
                this['_' + name].apply(this, arguments);

                return this;
            }
        });
    });
