"use strict";

var Timeline = require('../../src/animation/timeline'),
    Transition = require('../../src/animation/transition'),
    field = require('../../src/magic').field,
    map = require('../../src/magic').map;

describe("Timeline", function () {
    describe("duration", function () {
        it("is a field", function () {
            expect(Timeline.ref('duration').is(field)).toBe(true);
        });

        it("has a default value of 0", function () {
            expect(Timeline.duration()).toBe(0);
        });
    });

    describe("signal", function () {
        it("is a map", function () {
            expect(Timeline.ref('signal').is(map)).toBe(true);
        });
    });

    describe("transition", function () {
        it("is a field", function () {
            expect(Timeline.ref('transition').is(field)).toBe(true);
        });
    })

    describe("frame", function () {
        it("adds a signal for each of the properties of the first frame", function () {
            var timeline = Timeline.create();

            timeline.frame({
                x: 100
            });

            var x = timeline.signal('x');

            expect(x(0)).toBe(100);
        });

        it("transforms the signal for each of the properties of the following frames", function () {
            var timeline = Timeline.create().
                frame({
                    x: 100
                }).
                tween(Transition.linear, 500).
                frame({
                    x: 200
                }).
                tween(Transition.linear, 500).
                frame({
                    x: 150
                });

            var x = timeline.signal('x');

            expect(x(0)).toBe(100);
            expect(x(250)).toBe(150);
            expect(x(500)).toBe(200);
            expect(x(750)).toBe(175);
            expect(x(1000)).toBe(150);
        });

        it("works with step functions", function () {
            var timeline = Timeline.create().
                frame({
                    x: 'on'
                }).
                tween(Transition.stepOut, 500).
                frame({
                    x: 'off'
                });

            var x = timeline.signal('x');

            expect(x(0)).toBe('on');
            expect(x(250)).toBe('on');
            expect(x(500)).toBe('off');
        });

        it("returns the timeline", function () {
            var timeline = Timeline.create();

            var result = timeline.frame({
                'foo': 'bar'
            });

            expect(result).toBe(timeline);
        });
    });

    describe("tween", function () {
        it("adds its duration to the total duration", function () {
            var timeline = Timeline.create().
                frame({'x': 10}).
                tween(Transition.linear, 500);

            expect(timeline.duration()).toBe(500);
        });

        it("sets the transition for the tween", function () {
            var timeline = Timeline.create().
                frame({'x': 10}).
                tween(Transition.linear, 500).
                frame({'x': 10}).
                tween(Transition.linear, 1500);

            var transition = timeline.transition();

            expect(transition.timing()).toBe(Transition.linear);
            expect(transition.delay()).toBe(500);
            expect(transition.duration()).toBe(1500);
        });

        it("returns the timeline", function () {
            var timeline = Timeline.create().
                frame({'x': 10});

            var result = timeline.tween(Transition.linear, 500);

            expect(result).toBe(timeline);
        });
    });

    var cases = ['linear', 'sineIn', 'sineOut', 'stepIn', 'stepOut'];

    cases.forEach(function (name) {
        describe(name, function () {
            it("is a short-cut for tween(Transition." + name + ", ...)", function () {
                var timeline = Timeline.create().
                    frame({x: 10});

                timeline[name](500);

                var transition = timeline.transition();

                expect(transition.timing()).toBe(Transition[name]);
                expect(transition.duration()).toBe(500);
            });
        });
    });

    describe("playback", function () {
        it("maps the control using each signal", function () {
            var $element = {
                behavior: function () {
                    return function() {};
                }
            };

            var control = {
                map: function () {}
            };

            spyOn(control, 'map');

            var timeline = Timeline.create().
                frame({foo: 'bar'});

            timeline.playback($element, control);

            var signal = timeline.signal('foo');

            expect(control.map).toHaveBeenCalledWith(signal);
        });

        it("takes a behavior from the element", function () {
            var $element = {
                behavior: function () {
                    return function() {};
                }
            };

            var control = {
                map: function () {}
            };

            spyOn($element, 'behavior').andCallThrough();

            Timeline.create().
                frame({foo: 'bar'}).
                playback($element, control);

            expect($element.behavior).toHaveBeenCalledWith('foo');
        });

        it("sets the signal on the behavior", function () {
            var it = jasmine.createSpy('it');
            var mapped = function () {};

            var $element = {
                behavior: function () {
                    return it;
                }
            };

            var control = {
                map: function () {
                    return mapped;
                }
            };

            Timeline.create().
                frame({foo: 'bar'}).
                playback($element, control);

            expect(it).toHaveBeenCalledWith(mapped);
        });
    });
});
