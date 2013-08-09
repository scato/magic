"use strict";

var behavior = require('../../src/magic/').behavior;

describe("behavior", function () {
    it("is a function", function () {
        var a = behavior();

        expect(typeof a).toBe('function');
    });

    it("has an initial getter", function () {
        var a = behavior(function () {
            return "foo";
        });

        expect(a()).toBe("foo");
    });

    it("can also have an initial value", function () {
        var a = behavior("foo");

        expect(a()).toBe("foo");
    });

    it("acts as modify/revert when given a function", function () {
        var a = behavior("");

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

    it("acts as replace/revert when given a non-function", function () {
        var a = behavior("foo");

        var undo = a("bar");

        expect(a()).toBe("bar");

        undo();

        expect(a()).toBe("foo");
    });
});
