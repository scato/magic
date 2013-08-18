"use strict";

var Timeline = require('../../src/animation/timeline'),
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

    describe("prop", function () {
        it("is a map", function () {
            expect(Timeline.ref('prop').is(map)).toBe(true);
        });
    });

    describe("frame", function () {
        it("adds a behavior for each of the frame properties", function () {
            var timeline = Timeline.create();

            timeline.frame({
                'foo': 'bar'
            });

            var foo = timeline.prop('foo');

            expect(foo(0)).toBe('bar');
        });

        it("transforms the behaviors for each of the frame properties", function () {
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
        it("applies the shape to two frames", function () {

        });

        it("adds its duration to the total duration", function () {
            var timeline = Timeline.create()
                .frame({'x': 10})
                .tween(function () {}, 0.5);

            expect(timeline.duration()).toBe(0.5);
        });

        it("returns the timeline", function () {
            var timeline = Timeline.create()
                .frame({'x': 10});

            var result = timeline.tween(function () {}, 0.5);

            expect(result).toBe(timeline);
        });
    });
});
