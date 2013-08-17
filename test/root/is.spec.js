"use strict";

var Root = require('../../src/root/');

describe("Root", function () {
    describe("is", function () {
        it("returns true if given a prototype", function () {
            var object = Root.create();

            expect(object.is(Root)).toBe(true);
        });

        it("returns false if given just any object", function () {
            var object = Root.create();

            expect(object.is({})).toBe(false);
        });

        it("returns true if given itself", function () {
            var object = Root.create();

            expect(object.is(object)).toBe(true);
        });
    });
});
