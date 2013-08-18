"use strict";

var Transition = require('../../src/animation/transition'),
    field = require('../../src/magic').field;

describe("Transition", function () {
    var cases = [
        {name: 'linear',  timing: Transition.linear,  via: 50},
        {name: 'sineIn',  timing: Transition.sineIn,  via: 71},
        {name: 'sineOut', timing: Transition.sineOut, via: 29},
        {name: 'stepIn',  timing: Transition.stepIn,  via: true},
        {name: 'stepOut', timing: Transition.stepOut, via: false}
    ];

    cases.forEach(function (test) {
        describe(test.name, function () {
            if (typeof test.via === 'boolean') {
                it("starts with 'off'", function () {
                    expect(test.timing(0)).toBe(false);
                });

                it("gives '" + (test.via ? 'on' : 'off') + "' half way", function () {
                    expect(test.timing(0.5)).toBe(test.via);
                });

                it("ends with 'on", function () {
                    expect(test.timing(1)).toBe(true);
                });
            } else {
                it("starts with 0%", function () {
                    expect(test.timing(0) * 100).toBe(0);
                });

                it("gives " + test.via + "% half way", function () {
                    expect(Math.round(test.timing(0.5) * 100)).toBe(test.via);
                });

                it("ends with 100%", function () {
                    expect(test.timing(1) * 100).toBe(100);
                });
            }
        });
    });

    describe("duration", function () {
        it("is a field", function () {
            expect(Transition.ref('duration').is(field)).toBe(true);
        });
    });

    describe("timing", function () {
        it("is a field", function () {
            expect(Transition.ref('timing').is(field)).toBe(true);
        });
    });

    describe("delay", function () {
        it("is a field", function () {
            expect(Transition.ref('delay').is(field)).toBe(true);
        });

        it("has a default value of 0", function () {
            expect(Transition.delay()).toBe(0);
        });
    });

    describe("signal", function () {
        it("returns a function from time to a value within a range", function () {
            var transition = Transition.create().
                duration(500).
                timing(Transition.sineIn).
                delay(100);

            var signal = transition.signal(0, 100);

            expect(signal(100)).toBe(0);
            expect(Math.round(signal(350))).toBe(71);
            expect(signal(600)).toBe(100);
        });

        it("returns 0 for times smaller than 0", function () {
            var transition = Transition.create().
                duration(500).
                timing(Transition.sineIn);

            var signal = transition.signal(0, 100);

            expect(signal(-1)).toBe(0);
        });

        it("returns 0 for times greater than the duration", function () {
            var transition = Transition.create().
                duration(500).
                timing(Transition.sineIn);

            var signal = transition.signal(0, 100);

            expect(signal(501)).toBe(100);
        });
    });
});
