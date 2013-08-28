"use strict";

var Root  = require('../../src/root/'),
    reactive = require('../../src/magic').reactive;

describe("Root", function () {
    describe("reactive", function () {
        it("defines a reactive value on a prototype", function () {
            var Proto = Root.create();

            Proto.reactive('foo');

            expect(Proto.ref('foo').is(reactive)).toBe(true);
        });

        it("accepts a function for the default value", function () {
            var Proto = Root.create();

            Proto.reactive('foo', function () { return 'bar'; });

            expect(Proto.foo()).toBe('bar');
        });

        it("returns the prototype", function () {
            var Proto = Root.create();

            var result = Proto.reactive('foo');

            expect(result).toBe(Proto);
        });

        it("makes the setter return its context", function () {
            var Proto = Root.create();
            var context = Proto.create();

            Proto.reactive('foo');

            var result = context.foo('bar');

            expect(result).toBe(context);
        });
    });
});
