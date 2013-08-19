(function (){
    "use strict";

    var $ = require('br-jquery');

    var observable = require('../magic').observable,
        event      = require('../magic').event,
        action     = require('../magic').action,
        phase      = require('../magic').phase,
        behavior   = require('../magic').behavior,
        on         = require('../magic').effect.on,
        during     = require('../magic').effect.during;

    require('../magic/jquery');

    var Timeline = require('../animation/timeline'),
        Control  = require('../animation/control');

    function include($el) {
        $el.appendTo('body');
        return function () {
            $el.remove();
        };
    }

    function transition(active, progress, duration) {
        var start = 0, last = Date.now();

        return [
            on(active.start(), function () {
                start = progress(Date.now());
                last = Date.now();

                progress(function (t) {
                    return Math.max(0, Math.min(start + (t - last) / duration, 1));
                });
            }),
            on(active.end(), function () {
                start = progress(Date.now());
                last = Date.now();

                progress(function (t) {
                    return Math.max(0, Math.min(start - (t - last) / duration, 1));
                });
            })
        ].reduce(action.merge);
    }

    function overlay(maxOpacity, close) {
        var $overlay = $('<div></div>').
            addClass('overlay').
            click(close);

        var active = phase();

        var shuttle = Control.shuttle(active, 1000);

        var timeline = Timeline.create().
            frame({display: 'none'}).
            stepIn(500).
            frame({display: 'block'});

        var timeline2 = Timeline.create().
            frame({opacity: 0}).
            linear(500).
            frame({opacity: maxOpacity});

        var display = timeline.signal('display');
        var opacity = timeline2.signal('opacity');

        function map(left, right) {
            return function (t) {
                return right(left(t));
            };
        }

        include($overlay);

        $overlay.behavior('display')(map(shuttle, display));
        $overlay.behavior('opacity')(map(shuttle, opacity));

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
        var progress = behavior(function (t) {
            return 0;
        });

        transition(active, progress, 1000);

        var timeline = Timeline.create().
            frame({
                display: 'none',
                height: 0,
                width: 0
            }).
            stepOut(500).
            frame({
                display: 'block'
            }).
            sineIn(250).
            frame({
                height: maxHeight
            }).
            sineIn(250).
            frame({
                width: maxWidth
            });

        function wrap(signal) {
            return function (t) {
                return signal(progress(t) * 1000);
            };
        }

        var display = timeline.signal('display');
        var height = timeline.signal('height');
        var width = timeline.signal('width');

        var marginTop = function (t) {
            return -height(t) / 2;
        };

        var marginLeft = function (t) {
            return -width(t) / 2;
        };

        var timeline2 = Timeline.create().
            frame({display: 'none'}).
            stepOut(1000).
            frame({display: 'block'});

        var content = timeline2.signal('display');

        $modal.behavior('display')(wrap(display));
        $modal.behavior('height')(wrap(height));
        $modal.behavior('width')(wrap(width));
        $modal.behavior('marginTop')(wrap(marginTop));
        $modal.behavior('marginLeft')(wrap(marginLeft));
        $content.behavior('display')(wrap(content));

        include($modal);

        return active;
    }

    var active = phase();
    var close = event();

    active(overlay(0.5, close));
//    active(modal(300, 200, 'Zoomah!'));

    $('button').click(function () {
        close.one()(active());
    });
}());
