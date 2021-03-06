"use strict";

var reactive = require('../../src/magic/').reactive,
    expr = require('../../src/magic/').expr;

describe("expr", function () {
    it("is a function", function () {
        var a = expr(function () {
            return 42;
        });

        expect(typeof a).toBe('function');
    });

    it("is described by a function", function () {
        var a = expr(function () {
            return 42;
        });
        
        expect(a()).toBe(42);
    });

    it("is updated automatically", function () {
        var a = reactive(1);
        var b = reactive(2);
        var c = expr(function () {
            return a() + b();
        });
        
        b(4);
        
        expect(c()).toBe(5);
    });

    it("is fires on change", function () {
        var a = reactive(1);
        var b = reactive(2);
        var c = expr(function () {
            return a() + b();
        });
        
        var foo = jasmine.createSpy('foo');
        
        c(foo);
        b(4);
        
        expect(foo).toHaveBeenCalledWith(5);
    });

    it("cannot be set", function () {
        var a = expr(function () {
            return 42;
        });
        
        expect(function () {
            a(43);
        }).toThrow(new Error("Cannot set an expr"));
    });

    describe("is", function () {
        it("returns true if given reactive", function () {
            var a = expr(function () {
                return 42;
            });

            expect(a.is(reactive)).toBe(true);
        });

        it("returns false if given something else", function () {
            var a = expr(function () {
                return 42;
            });

            expect(a.is({})).toBe(false);
        });
    });
});
