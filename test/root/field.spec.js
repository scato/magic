"use strict";

var Root  = require('../../src/root/'),
    field = require('../../src/magic').field;

describe("Root", function () {
    describe("field", function () {
        it("defines a field on a prototype", function () {
            var Proto = Root.create();

            Proto.field('foo');

            expect(Proto.ref('foo').is(field)).toBe(true);
        });

        it("returns the prototype", function () {
            var Proto = Root.create();

            var result = Proto.field('foo');

            expect(result).toBe(Proto);
        });

        it("makes the getter return its context", function () {
            var Proto = Root.create();
            var context = Proto.create();

            Proto.field('foo');

            var result = context.foo('bar');

            expect(result).toBe(context);
        });
    });
});
