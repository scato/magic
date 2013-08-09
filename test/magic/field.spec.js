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
});
