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

        it("calls the factory method once for each instance", function () {
            var Proto = Root.create();
            var factory = jasmine.createSpy('factory');

            factory.andReturn(function () {});

            Proto.lazy('foo', factory);

            var test1 = Proto.create();
            var test2 = Proto.create();

            test1.foo();
            test2.foo();

            expect(factory.callCount).toBe(2);
        });
    });
});
