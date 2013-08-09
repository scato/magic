(function (){
    "use strict";

    var $ = self.jQuery;

    var observable = require('../magic').observable,
        event      = require('../magic').event,
        action     = require('../magic').action,
        phase      = require('../magic').phase,
        behavior   = require('../magic').behavior,
        on         = require('../magic').effect.on,
        during     = require('../magic').effect.during;

    require('../magic/jquery');

    function include($el) {
        $el.appendTo('body');
        return function () {
            $el.remove();
        };
    }

    function transition(active, progress, duration) {
        var start = 0, last = Date.now();

        return [
            on(active.start().merge(active.end()), function () {
                start = progress();
                last = Date.now();
            }),
            progress(function () {
                return Math.max(0, Math.min(start - (Date.now() - last) / duration, 1));
            }),
            during(active, function () {
                return progress(function () {
                    return Math.max(0, Math.min(start + (Date.now() - last) / duration, 1));
                });
            })
        ].reduce(action.merge);
    }

    function stepIn(progress, from, to) {
        return function () {
            return progress() === 0 ? from : to;
        };
    }

    function stepOut(progress, from, to) {
        return function () {
            return progress() === 1 ? to : from;
        };
    }

    function ramp(progress, from, to) {
         return function () {
             if (progress() < from) {
                 return 0;
             } else if(progress() < to) {
                 return (progress() - from) / (to - from);
             } else {
                 return 1;
             }
         };
    }

    function linear(progress, from, to) {
        return function () {
            return from + progress() * (to - from);
        };
    }

    function sineIn(progress, from, to) {
        return function () {
            return from + Math.sin(progress() * Math.PI / 2) * (to - from);
        };
    }

    function overlay(maxOpacity, close) {
        var $overlay = $('<div></div>').
            addClass('overlay').
            click(close);

        var active = phase();
        var progress = behavior();

        transition(active, progress, 1000);

        var display = stepIn(ramp(progress, 0, 0.5), 'none', 'block');
        var opacity = linear(ramp(progress, 0, 0.5), 0, maxOpacity);

        $overlay.behavior('display')(display);
        $overlay.behavior('opacity')(opacity);

        include($overlay);

        return active;
    }

    function modal(maxWidth, maxHeight, text) {
        var $modal = $('<div></div>').
            css({
                borderRadius: 10
            }).
            addClass('modal');

        var $content = $('<div></div>').
            addClass('modal-content').
            text(text).
            appendTo($modal);

        var active = phase();
        var progress = behavior();

        transition(active, progress, 1000);

        var display = stepIn(ramp(progress, 0.5, 1), 'none', 'block');
        var height = sineIn(ramp(progress, 0.5, 0.75), 0, maxHeight);
        var width = sineIn(ramp(progress, 0.75, 1), 0, maxWidth);

        var marginTop = function () {
            return -height() / 2;
        };

        var marginLeft = function () {
            return -width() / 2;
        };

        var content = stepOut(ramp(progress, 0.5, 1), 'none', 'block');

        $modal.behavior('display')(display);
        $modal.behavior('height')(height);
        $modal.behavior('width')(width);
        $modal.behavior('marginTop')(marginTop);
        $modal.behavior('marginLeft')(marginLeft);
        $content.behavior('display')(content);

        include($modal);

        return active;
    }

    var active = phase();
    var close = event();

    active(overlay(0.5, close));
    active(modal(300, 200, 'Zoomah!'));

    $('button').click(function () {
        close.one()(active());
    });
}());
