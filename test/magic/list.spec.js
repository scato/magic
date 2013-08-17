"use strict";

var list = require('../../src/magic/').list;

describe("list", function () {
    it("is a function", function () {
        var a = list();

        expect(typeof a).toEqual('function');
    });

    it("is a getter/setter", function () {
        var a = list();

        a([1, 2, 3]);

        expect(a()).toEqual([1, 2, 3]);
    });

    it("returns a copy", function () {
        var a = list();
        var b = [1, 2, 3];

        a(b);

        expect(a()).not.toBe(b);
    });

    it("has an initial value", function () {
        var a = list([1, 2, 3]);

        expect(a()).toEqual([1, 2, 3]);
    });

    it("has an empty array by default", function () {
        var a = list();

        expect(a()).toEqual([]);
    });

    it("acts as add/remove when given a non-array value", function () {
        var a = list();

        var undo = a("foo");

        expect(a()).toContain("foo");

        undo();

        expect(a()).not.toContain("foo");
    });

    it("returns the context object when set", function () {
        var a = list();
        var context = {};

        var result = a.call(context, ['bar']);

        expect(result).toBe(context);
    });

    describe("is", function () {
        it("returns true if given list", function () {
            var a = list();

            expect(a.is(list)).toBe(true);
        });

        it("returns false if given something else", function () {
            var a = list();

            expect(a.is({})).toBe(false);
        });
    });

    describe("bind", function () {
        it("returns a bound function", function () {
            var context = {};
            var a = list();
            var b = a.bind(context);

            expect(b(['foo'])).toBe(context);
        });

        it("returns a list", function () {
            var context = {};
            var a = list();
            var b = a.bind(context);

            expect(b.is(list)).toBe(true);
        });
    });
});