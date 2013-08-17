"use strict";

var Root  = require('../../src/root/'),
    list = require('../../src/magic').list;

describe("Root", function () {
    describe("list", function () {
        it("defines a list on a prototype", function () {
            var Proto = Root.create();

            Proto.list('foo');

            expect(Proto.ref('foo').is(list)).toBe(true);
        });

        it("accepts a function for the default value", function () {
            var Proto = Root.create();
            var foo = ['bar'];

            Proto.list('foo', function () { return foo; });

            expect(Proto.foo()).toEqual(foo);
        });

        it("returns the prototype", function () {
            var Proto = Root.create();

            var result = Proto.list('foo');

            expect(result).toBe(Proto);
        });

        it("makes the setter return its context", function () {
            var Proto = Root.create();
            var context = Proto.create();

            Proto.list('foo');

            var result = context.foo(['bar']);

            expect(result).toBe(context);
        });
    });
});
