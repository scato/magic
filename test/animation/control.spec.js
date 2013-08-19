"use strict";

var Control = require('../../src/animation/control'),
    phase = require('../../src/magic').phase,
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

    // from now on, time is mocked by this variable
    var time = 1234;
    Control.time(function () { return time; });

    describe("shuttle", function () {
        it("turns a phase and a duration into a behavior", function () {
            var active = phase();

            var result = Control.shuttle(active, 1000);

            expect(result.is(behavior)).toBe(true);
        });

        describe("return value", function () {
            it("starts at 0", function () {
                var active = phase();
                var shuttle = Control.shuttle(active, 1000);

                expect(shuttle(10000)).toBe(0);
                expect(shuttle(10100)).toBe(0);
                expect(shuttle(10200)).toBe(0);
            });

            it("increases with time after the phase begins", function () {
                var active = phase();
                var shuttle = Control.shuttle(active, 1000);

                time = 10000;

                active();

                expect(shuttle(10000)).toBe(0);
                expect(shuttle(10100)).toBe(100);
                expect(shuttle(10200)).toBe(200);
            });

            it("is limited to duration", function () {
                var active = phase();
                var shuttle = Control.shuttle(active, 1000);

                time = 10000;

                active();

                expect(shuttle(10900)).toBe(900);
                expect(shuttle(11000)).toBe(1000);
                expect(shuttle(11100)).toBe(1000);
            });

            it("decreases with time after the phase ends", function () {
                var active = phase();
                var shuttle = Control.shuttle(active, 1000);

                time = 10000;

                var undo = active();

                time = 20000;

                undo();

                expect(shuttle(20000)).toBe(1000);
                expect(shuttle(20100)).toBe(900);
                expect(shuttle(20200)).toBe(800);
            });

            it("is limited to 0", function () {
                var active = phase();
                var shuttle = Control.shuttle(active, 1000);

                time = 10000;

                var undo = active();

                time = 20000;

                undo();

                expect(shuttle(20900)).toBe(100);
                expect(shuttle(21000)).toBe(0);
                expect(shuttle(21100)).toBe(0);
            });

            it("picks up where it left off at the end of the phase", function () {
                var active = phase();
                var shuttle = Control.shuttle(active, 1000);

                time = 10000;

                var undo = active();

                time = 10500;

                undo();

                expect(shuttle(10500)).toBe(500);
                expect(shuttle(10600)).toBe(400);
                expect(shuttle(10700)).toBe(300);
            });

            it("picks up where it left off at the start of the phase", function () {
                var active = phase();
                var shuttle = Control.shuttle(active, 1000);

                time = 10000;

                var undo = active();

                time = 10500;

                undo();

                time = 10750;

                active();

                expect(shuttle(10750)).toBe(250);
                expect(shuttle(10800)).toBe(300);
                expect(shuttle(10900)).toBe(400);
            });
        });
    });
});
