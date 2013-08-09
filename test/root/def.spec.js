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
    });
});
