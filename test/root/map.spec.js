"use strict";

var Root  = require('../../src/root/'),
    map = require('../../src/magic').map;

describe("Root", function () {
    describe("map", function () {
        it("defines a map on a prototype", function () {
            var Proto = Root.create();

            Proto.map('foo');

            expect(Proto.ref('foo').is(map)).toBe(true);
        });

        it("accepts a function for the default value", function () {
            var Proto = Root.create();

            Proto.map('foo', function () { return 'bar'; });

            expect(Proto.foo()).toBe('bar');
        });

        it("returns the prototype", function () {
            var Proto = Root.create();

            var result = Proto.map('foo');

            expect(result).toBe(Proto);
        });

        it("makes the setter return its context", function () {
            var Proto = Root.create();
            var context = Proto.create();

            Proto.map('foo');

            var result = context.foo({foo: 'bar'});

            expect(result).toBe(context);
        });

        it("makes the property setter return its context", function () {
            var Proto = Root.create();
            var context = Proto.create();

            Proto.map('foo');

            var result = context.foo('foo', 'bar');

            expect(result).toBe(context);
        });
    });
});
