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

    it("calls its actions on the instance", function () {
    	var a = event();
        var foo = jasmine.createSpy('foo');
        var context = {};
        
        a(foo);
    	
        foo.call(context, 'foz');

        expect(foo.calls[0].object).toBe(context);
    });

    it("makes the trigger return its context", function () {
    	var a = event();
    	var context = {};
    	
        var result = a.call(context, 'bar');

        expect(result).toBe(context);
    });

    describe("is", function () {
        it("returns true if given event", function () {
            var a = event();

            expect(a.is(event)).toBe(true);
        });

        it("returns false if given something else", function () {
            var a = event();

            expect(a.is({})).toBe(false);
        });
    });

    describe("bind", function () {
        it("returns a bound function", function () {
            var context = {};
            var a = event();
            var b = a.bind(context);

            expect(b('foo')).toBe(context);
        });

        it("returns an event", function () {
            var context = {};
            var a = event();
            var b = a.bind(context);

            expect(b.is(event)).toBe(true);
        });
    });
});
