"use strict";

var Root = require('../../src/htmud/root'),
    field = require('../../src/magic').field;

describe("Root", function () {
    describe("name", function () {
        it("is a field", function () {
            expect(Root.ref('name').is(field)).toBe(true);
        });
    });
});
