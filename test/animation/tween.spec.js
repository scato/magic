"use strict";

var Timeline = require('../../src/animation/timeline'),
    field = require('../../src/magic').field,
    behavior = require('../../src/magic').behavior;

describe("Timeline", function () {
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
