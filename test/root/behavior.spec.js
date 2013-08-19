"use strict";

var Root  = require('../../src/root/'),
    behavior = require('../../src/magic').behavior;

describe("Root", function () {
    describe("behavior", function () {
        it("defines a behavior on a prototype", function () {
            var Proto = Root.create();

            Proto.behavior('foo');

            expect(Proto.ref('foo').is(behavior)).toBe(true);
        });

        it("accepts a function for the default signal", function () {
            var Proto = Root.create();

            Proto.behavior('foo', function () { return function () { return 'bar'; }; });

            expect(Proto.foo()).toBe('bar');
        });

        it("returns the prototype", function () {
            var Proto = Root.create();

            var result = Proto.behavior('foo');

            expect(result).toBe(Proto);
        });

        it("makes the setter return its context", function () {
            var Proto = Root.create();
            var context = Proto.create();

            Proto.behavior('foo');

            var result = context.foo(function () { return 'bar'; });

            expect(result).toBe(context);
        });
    });
});
