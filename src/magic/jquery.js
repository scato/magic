var $ = require('br-jquery'),
    animation  = require('./window').animation,
    observable = require('./').observable,
    interval = require('./').interval,
    behavior = require('./').behavior;

$.fn.behavior = function (name) {
    var initial = this.css(name);

    var value = behavior(function (t) {
        return initial;
    });

    var that = this;

    animation(function () {
        that.css(name, value(Date.now()));
    });

    return value;
};

$.fn.event = function (name) {
    var that = this;

    return observable(function () {
        if (typeof arguments[0] === 'function') {
            var action = arguments[0];

            that.on(name, action);

            return function () {
                that.off(name, action);
            };
        } else {
            that.trigger(name, arguments[0]);
        }
    });
};

$.fn.field = function (name) {
    return this.prop.bind(this, name);
};
