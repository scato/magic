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

    it("applies its effects on the instance", function () {
    	var a = phase();
    	var bar = jasmine.createSpy('bar');
        var foo = jasmine.createSpy('foo').andReturn(bar);
        var context = {};
        
        a(foo);
        
        a.call(context, 'foz');
        
        expect(foo.calls[0].object).toBe(context);
    });

    describe("is", function () {
        it("returns true if given phase", function () {
            var a = phase();

            expect(a.is(phase)).toBe(true);
        });

        it("returns false if given something else", function () {
            var a = phase();

            expect(a.is({})).toBe(false);
        });
    });

    describe("bind", function () {
        it("returns a bound function", function () {
            var context = {};
            var a = phase();
            var b = a.bind(context);
            
            var bar = jasmine.createSpy('bar');
            var foo = jasmine.createSpy('foo');
            
            a(foo);
            b('foz');

            expect(foo).toHaveBeenCalledWith('foz');
            expect(foo.calls[0].object).toBe(context);
        });

        it("returns a phase", function () {
            var context = {};
            var a = phase();
            var b = a.bind(context);

            expect(b.is(phase)).toBe(true);
        });
    });
});