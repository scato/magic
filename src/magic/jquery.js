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

    return observable(function (action) {
        that.on(name, action);

        return function () {
            that.off(name, action);
        };
    });
};

$.fn.keyhold = function (keyCode) {
    return this.event('keydown').filter(function (e) {
        return e.keyCode === keyCode;
    }).til(this.event('keyup').filter(function (e) {
        return e.keyCode === keyCode;
    }));
};

$.fn.value = function () {
    var that = this;

    var change = that.event('change').map(function (e) {
        return e.target.value;
    });

    if (this.is(':radio')) {
        return function (arg) {
            if (arg === undefined) {
                return that.filter(':checked').val();
            } else if (typeof arg === 'function') {
                return change(arg);
            } else {
                that.each(function () {
                    this.checked = this.value === arg;
                });
            }
        };
    } else {
        return function (arg) {
            if (arg === undefined) {
                return that.val();
            } else if (typeof arg === 'function') {
                return change(arg);
            } else {
                that.val(arg);
            }
        };
    }
};
