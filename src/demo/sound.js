(function () {
    var $          = self.jQuery,
        observable = require('../magic').observable,
        event      = require('../magic').event,
        action     = require('../magic').action,
        phase      = require('../magic').phase,
        behavior   = require('../magic').behavior,
        on         = require('../magic').effect.on,
        during     = require('../magic').effect.during;

    require('../magic/jquery');

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

    var Synth = {
        TAU: 2 * Math.PI,
        sine: function (p) {
            return Math.sin(Synth.TAU * p);
        },
        square: function (p) {
            return Synth.sawtooth(p) - Synth.sawtooth(p - 0.5);
        },
        sawtooth: function (p) {
            return 2 * (p - Math.floor(p)) - 1;
        },
        triangle: function (p) {
            return 4 * Math.abs((2 * p - Math.floor(2 * p)) - (p - Math.floor(p))) - 1;
        },
        normalize: function(x) {
            return x / 2 + 0.5;
        }
    };

    $(window).load(function () {
        // SETUP INTERFACE

        var keys = [90, 83, 88, 68, 67, 86, 71, 66, 72, 78, 74, 77, 188, 76, 190, 186, 191];
        var tones = [];

        for (var i = 0; i < keys.length; i++) {
            tones[i] = Math.pow(2, (i - 9) / 12);
        }

        var base = $('[name=base]').value();
        var shape = $('[name=shape]').value();
        var amShape = $('[name=am-shape]').value();
        var amFreq = $('[name=am-freq]').value();

        keys.forEach(function (key, index) {
            $(window).keyhold(key)(function () {
                return play(wave(base() * tones[index]));
            });
        });

        redraw();

        base(redraw);
        shape(redraw);
        amShape(redraw);
        amFreq(redraw);

        // SETUP WAVE

        // coole acid base: sine(tone * t + 0.5 * norm-sine(tone / 2 * t))
        // computer geluid: triangle(tone * t) * triangle(tone / 20 * t)
        function wave(tone) {
            var _shape = Synth[shape()];
            var _amShape = Synth[amShape()];
            var _amFreq = tone / 20;

            return function (t) {
                return _shape(
                    tone * t
                ) *
                _amShape(_amFreq * t);
            };
        }

        // SETUP PLAYBACK

        var context = new self.webkitAudioContext();

        var signal = behavior(0);
        var sample = 0;
        var rate = context.sampleRate;

        function play(func) {
            var start = sample;

            return signal(function ($default) {
                return $default + 0.25 * func((sample - start) / rate);
            });
        }

        var size = 2048;
        var source = context.createScriptProcessor(size, 1, 1);
        var data = new Array(size);

        source.onaudioprocess = function (e) {
            var channelData = e.outputBuffer.getChannelData(0);
            for (var i = 0; i < size; i++) {
                data[i] = signal();
                sample++;
            }
            channelData.set(data);
        };

        source.connect(context.destination);

        // dunno why, but this starts audio
        console.log(source);

        // SETUP DISPLAY

        function redraw() {
            var context = $('canvas')[0].getContext('2d');
            var bounds = $('canvas')[0].getBoundingClientRect();

            context.fillStyle = 'white';
            context.fillRect(0, 0, bounds.width, bounds.height);

            context.beginPath();
            context.lineTo(0, bounds.height - 1);
            context.lineTo(0, 0);
            context.strokeStyle = 'black';
            context.stroke();

            context.beginPath();
            context.lineTo(0, bounds.height / 2);
            context.lineTo(bounds.width, bounds.height / 2);
            context.strokeStyle = 'black';
            context.stroke();

            var scale = bounds.width / 0.15;

            context.beginPath();

            var func = wave(base());

            for (var x = 0; x < bounds.width; x++) {
                var t = x / scale;
                var y = (bounds.height - 2) / 2 * (1 - func(t)) + 1;

                context.lineTo(x, y);
            }

            context.strokeStyle = 'red';
            context.stroke();
        }
    });
}());
