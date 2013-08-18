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
});
