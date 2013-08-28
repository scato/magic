"use strict";

var reactive = require('../../src/magic/').reactive;

describe("reactive", function () {
    it("is a function", function () {
        var a = reactive();

        expect(typeof a).toBe('function');
    });

    it("is a getter/setter", function () {
        var a = reactive("foo");

        expect(a()).toBe("foo");

        a("bar");

        expect(a()).toBe("bar");
    });

    it("is like an event", function () {
        var a = reactive();
        var foo = jasmine.createSpy('foo');

        var undo = a(foo);

        a("one");
        expect(foo).toHaveBeenCalledWith("one");

        undo();

        a("two");
        expect(foo).not.toHaveBeenCalledWith("two");
    });

    it("returns the context object when set", function () {
        var a = reactive();
        var context = {};

        var result = a.call(context, 'bar');

        expect(result).toBe(context);
    });

    describe("is", function () {
        it("returns true if given reactive", function () {
            var a = reactive();

            expect(a.is(reactive)).toBe(true);
        });

        it("returns false if given something else", function () {
            var a = reactive();

            expect(a.is({})).toBe(false);
        });
    });

    describe("bind", function () {
        it("returns a bound function", function () {
            var context = {};
            var a = reactive();
            var b = a.bind(context);

            expect(b('foo')).toBe(context);
        });

        it("returns a reactive value", function () {
            var context = {};
            var a = reactive();
            var b = a.bind(context);

            expect(b.is(reactive)).toBe(true);
        });
    });
});
