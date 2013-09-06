"use strict";

var Root = require('../../src/root/');

describe("Root", function () {
    describe("field", function () {
        it("defines a lazy method on a prototype", function () {
            var Proto = Root.create();
            var foo = jasmine.createSpy('foo');

            Proto.lazy('foo', function () {
                return foo;
            });

            var test = Proto.create();

            test.foo();

            expect(foo).toHaveBeenCalled();
        });

        it("returns the prototype", function () {
            var Proto = Root.create();

            var result = Proto.lazy('foo', function () {
                return function () {};
            });

            expect(result).toBe(Proto);
        });

        it("calls the factory method only once", function () {
            var Proto = Root.create();
            var factory = jasmine.createSpy('factory');

            factory.andReturn(function () {});

            Proto.lazy('foo', factory);

            var test = Proto.create();

            test.foo();
            test.foo();

            expect(factory.callCount).toBe(1);
        });

        it("calls the factory method once for each instance, on that instance", function () {
            var Proto = Root.create();
            var factory = jasmine.createSpy('factory');

            factory.andReturn(function () {});

            Proto.lazy('foo', factory);

            var test1 = Proto.create();
            var test2 = Proto.create();

            test1.foo();
            test2.foo();

            expect(factory.callCount).toBe(2);
            expect(factory.calls[0].object).toBe(test1);
            expect(factory.calls[1].object).toBe(test2);
        });

        it("lets you access the result of the factory through ref", function () {
            var Proto = Root.create();

            var bounds = [function () {}, function () {}, function () {}];
            var methods = bounds.map(function (bound) {
                var method = function () {};

                method.bind = function () {
                    return bound;
                };

                return method;
            });

            var factory = function () {
                return methods.shift();
            };

            Proto.lazy('foo', factory);

            var test1 = Proto.create();
            var test2 = Proto.create();

            Proto.foo();
            test1.foo();
            test2.foo();

            expect(Proto.ref('foo')).toBe(bounds[0]);
            expect(test1.ref('foo')).toBe(bounds[1]);
            expect(test2.ref('foo')).toBe(bounds[2]);
        });
    });
});
