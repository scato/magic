"use strict";

var Root = require('../../src/htmud/root'),
    field = require('../../src/magic').field;

describe("Root", function () {
    describe("name", function () {
        it("is a field", function () {
            expect(Character.ref('name').is(field)).toBe(true);
        });
    });
});
