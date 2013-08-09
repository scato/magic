"use strict";

var Root = require('../../src/root/');

describe("Root", function () {
    describe("field", function () {
        it("defines a field on a prototype", function () {
            var Proto = Root.create();
            var object = Proto.create();
            var foo = {};

            Proto.field('foo');

            object.foo(foo);

            expect(object.foo()).toBe(foo);
        });

        it("returns the prototype", function () {
            var Proto = Root.create();

            var result = Proto.field('foo');

            expect(result).toBe(Proto);
        });

        it("the field returns its object", function () {
            var Proto = Root.create();
            var object = Proto.create();
            var foo = {};

            Proto.field('foo');

            var result = object.foo(foo);

            expect(result).toBe(object);
        });
    });
});
