"use strict";

var phase = require('../../src/magic/').phase;

describe("phase", function () {
    it("is a function", function () {
        var a = phase();

        expect(typeof a).toBe('function');
    });

    it("acts as trigger when given a non-function", function () {
        var a = phase();
        var bar = jasmine.createSpy('bar');
        var foo = jasmine.createSpy('foo').andReturn(bar);

        a(foo);
        var undo = a("one");

        expect(foo).toHaveBeenCalledWith("one");

        undo();

        expect(bar).toHaveBeenCalled();
    });

    it("acts as bind/unbind when given a function", function () {
        var a = phase();
        var foo = jasmine.createSpy('foo');

        var undo = a(foo);

        a("one");
        expect(foo).toHaveBeenCalledWith("one");

        undo();

        a("two");
        expect(foo).not.toHaveBeenCalledWith("two");
    });

});