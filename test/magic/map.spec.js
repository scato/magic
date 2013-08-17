"use strict";

var map = require('../../src/magic/').map;

describe("map", function () {
    it("is a function", function () {
        var a = map();

        expect(typeof a).toEqual('function');
    });

    it("is a getter/setter", function () {
        var a = map();
        var values = {
            foo: 'bar'
        };

        a(values);

        expect(a()).toBe(values);
    });

    it("is a getter/setter for each property", function () {
        var a = map();

        a('foo', 'bar');

        expect(a('foo')).toBe('bar');
    });

    it("has an initial value", function () {
        var values = {
            foo: 'bar'
        };

        var a = map(values);

        expect(a()).toBe(values);
    });

    it("has an empty list of values by default", function () {
        var a = map();

        expect(a()).toEqual({});
    });

    it("returns the context object when set", function () {
        var a = map();
        var context = {};

        var result = a.call(context, {foo: 'bar'});

        expect(result).toBe(context);
    });

    it("returns the context object when setting a property", function () {
        var a = map();
        var context = {};

        var result = a.call(context, 'foo', 'bar');

        expect(result).toBe(context);
    });

    describe("is", function () {
        it("returns true if given map", function () {
            var a = map();

            expect(a.is(map)).toBe(true);
        });

        it("returns false if given something else", function () {
            var a = map();

            expect(a.is({})).toBe(false);
        });
    });

    describe("bind", function () {
        it("returns a bound function", function () {
            var context = {};
            var a = map();
            var b = a.bind(context);

            expect(b({foo: 'bar'})).toBe(context);
        });

        it("returns a map", function () {
            var context = {};
            var a = map();
            var b = a.bind(context);

            expect(b.is(map)).toBe(true);
        });
    });
});