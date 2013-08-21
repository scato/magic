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
        // create the overlay
        var $overlay = $('<div></div>').
            addClass('overlay').
            click(close).
            appendTo($('body'));

        // create a phase that determines when the overlay should be shown
        var active = phase();
        
        // create a control that forwards and reverses the animation
        var shuttle = Control.shuttle(active, 1000);

        // create the animation for the display-property
        Timeline.create().
            frame({display: 'none'}).
            stepIn(500).
            frame({display: 'block'}).
            playback($overlay, shuttle);

        // create the animation for the opacity-property
        Timeline.create().
            frame({opacity: 0}).
            linear(500).
            frame({opacity: maxOpacity}).
            playback($overlay, shuttle);

        return active;
    }

    function modal(maxWidth, maxHeight, text) {
        // create the modal
        var $modal = $('<div></div>').
            css({
                borderRadius: 10
            }).
            addClass('modal').
            appendTo($('body'));

        // create the content pane
        var $content = $('<div></div>').
            addClass('modal-content').
            text(text).
            appendTo($modal);

        // create a phase that determines when the modal should be shown
        var active = phase();
        
        // create a control to forward and reverse the animation
        var shuttle = Control.shuttle(active, 1000);

        // create the animation for the modal
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

        // create the animation for the content pane
        Timeline.create().
            frame({display: 'none'}).
            stepOut(1000).
            frame({display: 'block'}).
            playback($content, shuttle);

        return active;
    }

    // create an event to trigger when the the overlay+modal should be hidden
    var close = event();
    
    // create a phase that determines when the overlay+modal should be shown
    var active = $('button').event('click').til(close);

    // connect the overlay and the model to this phase
    active(overlay(0.5, close));
    active(modal(300, 200, 'Zoomah!'));
}());

