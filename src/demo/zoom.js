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

    function overlay(maxOpacity, close) {
        var $overlay = $('<div></div>').
            addClass('overlay').
            click(close).
            appendTo($('body'));

        var active = phase();
        var shuttle = Control.shuttle(active, 1000);

        Timeline.create().
            frame({display: 'none'}).
            stepIn(500).
            frame({display: 'block'}).
            playback($overlay, shuttle);

        Timeline.create().
            frame({opacity: 0}).
            linear(500).
            frame({opacity: maxOpacity}).
            playback($overlay, shuttle);

        return active;
    }

    function modal(maxWidth, maxHeight, text) {
        var $modal = $('<div></div>').
            css({
                borderRadius: 10
            }).
            addClass('modal').
            appendTo($('body'));

        var $content = $('<div></div>').
            addClass('modal-content').
            text(text).
            appendTo($modal);

        var active = phase();
        var shuttle = Control.shuttle(active, 1000);

        Timeline.create().
            frame({
                display: 'none',
                height: 0,
                width: 0,
                marginTop: 0,
                marginLeft: 0
            }).
            stepOut(500).
            frame({
                display: 'block'
            }).
            sineIn(250).
            frame({
                height: maxHeight,
                marginTop: -maxHeight / 2
            }).
            sineIn(250).
            frame({
                width: maxWidth,
                marginLeft: -maxWidth / 2
            }).
            playback($modal, shuttle);

        Timeline.create().
            frame({display: 'none'}).
            stepOut(1000).
            frame({display: 'block'}).
            playback($content, shuttle);

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
