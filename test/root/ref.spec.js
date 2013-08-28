"use strict";

var Root = require('../../src/root');

describe("Root", function () {
    describe("ref", function () {
        it("returns a function", function () {
            var Proto = Root.create().
                def('foo', function () {});

            var test = Proto.create();
            var ref = test.ref('foo');

            expect(typeof ref).toBe('function');
        });

        it("returns a function bound to its context", function () {
            var foo = jasmine.createSpy('foo');
            var Proto = Root.create().
                def('foo', foo);

            var test = Proto.create();
            var ref = test.ref('foo');

            ref('bar');

            expect(foo).toHaveBeenCalledWith('bar');
            expect(foo.calls[0].object).toBe(test);
        });

        it("throws an error when the property is not defined", function () {
            var Proto = Root.create();

            expect(function () {
                Proto.ref('foo');
            }).toThrow(new Error("Object has no method 'foo'"));
        });
    });
});