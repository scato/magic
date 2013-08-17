"use strict";

var Character = require('../../src/htmud/character'),
    field     = require('../../src/magic').field;

describe("Character", function () {
    describe("name", function () {
        it("is a field", function () {
            expect(Character.ref('name').is(field)).toBe(true);
        });
    });
});
