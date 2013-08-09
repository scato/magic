var $ = self.jQuery,
    animation  = require('./window').animation,
    observable = require('./').observable,
    interval = require('./').interval;

$.fn.behavior = function (name) {
    var that = this;

    return function (value) {
        return animation(function () {
            that.css(name, value());
        });
    };
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
