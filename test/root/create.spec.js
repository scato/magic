"use strict";

var Root = require('../../src/root/');

describe("Root", function () {
    describe("create", function () {
        it("creates an instance of the prototype", function () {
            var Proto = Root.create();
            var object = Proto.create();

            expect(Root.isPrototypeOf(Proto)).toBe(true);
            expect(Root.isPrototypeOf(object)).toBe(true);
            expect(Proto.isPrototypeOf(Root)).toBe(false);
            expect(Proto.isPrototypeOf(object)).toBe(true);
            expect(object.isPrototypeOf(Root)).toBe(false);
            expect(object.isPrototypeOf(Proto)).toBe(false);
        });

        it("sets a base property on the instance", function () {
            var Proto = Root.create();

            expect(Proto.base).toBe(Root);
        });
    });
});
