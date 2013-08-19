"use strict";

var behavior = require('../../src/magic/').behavior;

describe("behavior", function () {
    it("is a function", function () {
        var a = behavior();

        expect(typeof a).toBe('function');
    });

    it("has an initial signal", function () {
        var a = behavior(function (t) {
            return 42;
        });

        expect(a(0)).toBe(42);
    });

    it("switches to a new signal when given one", function () {
        var a = behavior(function (t) {
            return 42;
        });

        a(function (t) {
            return t / 2;
        });

        expect(a(10)).toBe(5);
    });

    it("returns the context object when set", function () {
        var a = behavior();
        var context = {};

        var result = a.call(context, function () { return 'bar'; });

        expect(result).toBe(context);
    });

    describe("is", function () {
        it("returns true if given behavior", function () {
            var a = behavior();

            expect(a.is(behavior)).toBe(true);
        });

        it("returns false if given something else", function () {
            var a = behavior();

            expect(a.is({})).toBe(false);
        });
    });

    describe("bind", function () {
        it("returns a bound function", function () {
            var context = {};
            var a = behavior();
            var b = a.bind(context);

            expect(b(function () { return 'foo'; })).toBe(context);
        });

        it("returns a behavior", function () {
            var context = {};
            var a = behavior();
            var b = a.bind(context);

            expect(b.is(behavior)).toBe(true);
        });
    });
});
