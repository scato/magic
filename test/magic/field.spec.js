"use strict";

var field = require('../../src/magic/').field;

describe("field", function () {
    it("is a function", function () {
        var a = field();

        expect(typeof a).toBe('function');
    });

    it("is a getter/setter", function () {
        var a = field();

        a("foo");

        expect(a()).toBe("foo");
    });

    it("has an initial value", function () {
        var a = field("bar");

        expect(a()).toBe("bar");
    });

    it("has a value of undefined by default", function () {
        var a = field();

        expect(a()).toBe(undefined);
    });

    it("returns the context object when set", function () {
        var a = field();
        var context = {};

        var result = a.call(context, 'bar');

        expect(result).toBe(context);
    });

    describe("is", function () {
        it("returns true if given field", function () {
            var a = field();

            expect(a.is(field)).toBe(true);
        });

        it("returns false if given something else", function () {
            var a = field();

            expect(a.is({})).toBe(false);
        });
    });

    describe("bind", function () {
        it("returns a bound function", function () {
            var context = {};
            var a = field();
            var b = a.bind(context);

            expect(b('foo')).toBe(context);
        });

        it("returns a field", function () {
            var context = {};
            var a = field();
            var b = a.bind(context);

            expect(b.is(field)).toBe(true);
        });
    });
});
