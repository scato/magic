"use strict";

var Root  = require('../../src/root/'),
    dynamic = require('../../src/magic').dynamic;

describe("Root", function () {
    describe("dynamic", function () {
        it("defines a dynamic value on a prototype", function () {
            var Proto = Root.create();

            Proto.dynamic('foo');

            expect(Proto.ref('foo').is(dynamic)).toBe(true);
        });

        it("accepts a function for the default value", function () {
            var Proto = Root.create();

            Proto.dynamic('foo', function () { return 'bar'; });

            expect(Proto.foo()).toBe('bar');
        });

        it("returns the prototype", function () {
            var Proto = Root.create();

            var result = Proto.dynamic('foo');

            expect(result).toBe(Proto);
        });
    });
});
