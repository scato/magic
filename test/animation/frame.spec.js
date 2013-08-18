"use strict";

var Timeline = require('../../src/animation/timeline'),
    field = require('../../src/magic').field,
    behavior = require('../../src/magic').behavior;

describe("Timeline", function () {
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
});
