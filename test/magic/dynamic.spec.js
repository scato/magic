"use strict";

var dynamic = require('../../src/magic/').dynamic;

describe("dynamic", function () {
    it("is a function", function () {
        var a = dynamic();

        expect(typeof a).toBe('function');
    });

    it("has an initial value", function () {
        var a = dynamic("foo");

        expect(a()).toBe("foo");
    });

    it("acts as modify/revert when given a function", function () {
        var a = dynamic("");

        var foo = function (initial) {
            return "foo";
        };

        var bar = function (initial) {
            return initial + "bar";
        };

        var undo = a(foo);

        expect(a()).toBe("foo");

        a(bar);

        expect(a()).toBe("foobar");

        undo();

        expect(a()).toBe("bar");
    });

    describe("is", function () {
        it("returns true if given dynamic", function () {
            var a = dynamic();

            expect(a.is(dynamic)).toBe(true);
        });

        it("returns false if given something else", function () {
            var a = dynamic();

            expect(a.is({})).toBe(false);
        });
    });

    describe("bind", function () {
        it("returns a dynamic value", function () {
            var context = {};
            var a = dynamic();
            var b = a.bind(context);

            expect(b.is(dynamic)).toBe(true);
        });
    });
});
