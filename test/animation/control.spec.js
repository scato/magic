"use strict";

var Control = require('../../src/animation/control'),
    behavior = require('../../src/magic').behavior;

describe("Control", function () {
    describe("time", function () {
        it("is a behavior", function () {
            expect(Control.ref('time').is(behavior)).toBe(true);
        });

        it("returns Date.now() by default", function () {
            spyOn(Date, 'now').andReturn(1234);

            expect(Control.time()).toBe(1234);
        });
    });

    describe("shuttle", function () {
        it("turns a phase and a duration into a behavior");

        describe("return value", function () {
            it("starts at 0");
            it("increases with time after the phase begins");
            it("is limited to duration");
            it("decreases with time after the phase ends");
            it("is limited to 0");
            it("picks up where it left off at the end of the phase");
            it("picks up where it left off at the start of the phase");
        });
    });
});
