"use strict";

var Root = require('../../src/root');

describe("Root", function () {
    describe("override", function () {
        it("cannot be used if the method does not exist", function () {
            var Proto = Root.create();

            expect(function () {
                Proto.override('foo', function (base) {
                    return function () {};
                });
            }).toThrow(new Error("Cannot override non-existent method 'foo'"));
        });

        it("cannot be used if the method exists on the same prototype", function () {
            var Proto = Root.create();

            Proto.def('foo', function () {});

            expect(function () {
                Proto.override('foo', function (base) {
                    return function () {};
                });
            }).toThrow(new Error("The method 'foo' already exists on this prototype"));
        });

        it("accepts a factory function and passes a base function to it", function () {
            var base = jasmine.createSpy('base');
            var deriv = jasmine.createSpy('deriv');

            var Base = Root.create().
                def('foo', base);

            var Deriv = Base.create().
                override('foo', function (base) {
                    return function (arg) {
                        deriv.call(this, arg);
                        base(arg, 'bar');
                        return 42;
                    };
                });

            var context = Deriv.create();

            var result = context.foo('foo');

            expect(base.calls[0].object).toBe(context);
            expect(base).toHaveBeenCalledWith('foo', 'bar');

            expect(deriv.calls[0].object).toBe(context);
            expect(deriv).toHaveBeenCalledWith('foo');

            expect(result).toBe(42);
        });

        it("returns the prototype", function () {
            var Base = Root.create().
                def('foo', function () {});

            var Deriv = Base.create();

            var result = Deriv.
                override('foo', function () {
                    return function () {};
                });

            expect(result).toBe(Deriv);
        });
    });
});