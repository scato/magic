"use strict";

var Root = require('../../src/root');

describe("Root", function () {
    describe("overrule", function () {
        it("cannot be used if the method does not exist", function () {
            var Proto = Root.create();

            expect(function () {
                Proto.overrule('foo', function (initial) {
                    return function () {};
                });
            }).toThrow(new Error("Cannot overrule non-existent method 'foo'"));
        });

        it("accepts a factory function and passes an initial function to it", function () {
            var initial = jasmine.createSpy('initial');
            var special = jasmine.createSpy('special');

            var Proto = Root.create().
                def('foo', initial);

            var context = Proto.create();

            context.overrule('foo', function (initial) {
                return function (arg) {
                    special.call(this, arg);
                    initial(arg, 'bar');
                    return 42;
                };
            });

            var result = context.foo('foo');

            expect(initial.calls[0].object).toBe(context);
            expect(initial).toHaveBeenCalledWith('foo', 'bar');

            expect(special.calls[0].object).toBe(context);
            expect(special).toHaveBeenCalledWith('foo');

            expect(result).toBe(42);
        });

        it("can be reversed", function () {
            var initial = jasmine.createSpy('initial');
            var special = jasmine.createSpy('special');

            var Proto = Root.create().
                def('foo', initial);

            var context = Proto.create();

            var undo = context.overrule('foo', function (initial) {
                return function (arg) {
                    special.call(this, arg);
                    initial(arg, 'bar');
                    return 42;
                };
            });

            undo();

            var result = context.foo('foo');

            expect(initial.calls[0].object).toBe(context);
            expect(initial).toHaveBeenCalledWith('foo');

            expect(special).not.toHaveBeenCalled();
        });
    });
});
