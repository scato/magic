var observable = require('./').observable;

var timeout = function (delay) {
    return observable(function (observer) {
        var id = window.setTimeout(observer, delay);

        return function () {
            window.clearTimeout(id);
        };
    });
};

var interval = function (delay) {
    return observable(function (observer) {
        var id = window.setInterval(observer, delay);

        return function () {
            window.clearInterval(id);
        };
    });
};

var animationFrame = observable(function (observer) {
    var id = window.requestAnimationFrame(observer);

    return function () {
        window.cancelAnimationFrame(id);
    };
});

var animation = animationFrame.recycle();

exports.timeout        = timeout;
exports.interval       = interval;
exports.animationFrame = animationFrame;
exports.animation      = animation;
