"use strict";

var Root = require('../../src/root/');

describe("Root", function () {
    describe("def", function () {
        it("defines a property on a prototype", function () {
            var Proto = Root.create();
            var foo = function () {};

            expect(Proto.hasOwnProperty('foo')).toBe(false);

            Proto.def('foo', foo);

            expect(Proto.hasOwnProperty('foo')).toBe(true);
            expect(Proto.foo).toBe(foo);
        });

        it("returns the prototype", function () {
            var Proto = Root.create();
            var foo = function () {};

            var result = Proto.def('foo', foo);

            expect(result).toBe(Proto);
        });

        it("cannot be used if the method already exists on the same prototype", function () {
            var Proto = Root.create();

            Proto.def('foo', function () {});

            expect(function () {
                Proto.def('foo', function () {});
            }).toThrow(new Error("The method 'foo' already exists on this prototype"));
        });

        it("cannot be used if the method already exists on a base prototype", function () {
            var Proto = Root.create();

            Proto.def('foo', function () {});

            expect(function () {
                var Deriv = Proto.create()
                    .def('foo', function () {});
            }).toThrow(new Error("The method 'foo' already exists on this prototype"));
        });
    });
});
