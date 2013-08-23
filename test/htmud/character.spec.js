"use strict";

var Character = require('../../src/htmud/character'),
    Root      = require('../../src/htmud/root'),
    field     = require('../../src/magic').field,
    list      = require('../../src/magic').list;

describe("Character", function () {
    it("is a Root", function () {
        expect(Character.is(Root)).toBe(true);
    });
    
    describe("wields", function () {
        it("is a list", function () {
            expect(Character.ref('wields').is(list)).toBe(true);
        });
    });
    
    describe("mayWield", function () {
        it("allows only one Weapon, Shield, Armor and Helmet", function () {
            
        });
    });
});
