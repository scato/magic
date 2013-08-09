"use strict";

var event = require('../../src/magic/').event;

describe("event", function () {
    it("is a function", function () {
        var a = event();

        expect(typeof a).toBe('function');
    });

    it("acts as trigger when given a non-function", function () {
        var a = event();
        var foo = jasmine.createSpy('foo');

        a(foo);
        a("one");

        expect(foo).toHaveBeenCalledWith("one");
    });

    it("acts as bind/unbind when given a function", function () {
        var a = event();
        var foo = jasmine.createSpy('foo');

        var undo = a(foo);

        a("one");
        expect(foo).toHaveBeenCalledWith("one");

        undo();

        a("two");
        expect(foo).not.toHaveBeenCalledWith("two");
    });
});
