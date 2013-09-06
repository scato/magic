"use strict";

var Character = require('../../src/htmud/character'),
    Root      = require('../../src/htmud/root'),
    field     = require('../../src/magic').field,
    list      = require('../../src/magic').list,
    Item      = require('../../src/htmud/item'),
    ItemType  = require('../../src/htmud/itemtype');

describe("Character", function () {
    it("is a Root", function () {
        expect(Character.is(Root)).toBe(true);
    });
    
    describe("items", function () {
    });
    
    describe("wields", function () {
    });
    
    describe("mayWield", function () {
        it("allows only one Weapon", function () {
            var character = Character.create();
            
            var first = Item.create().
            	type(ItemType.Weapon).
            	take(character);
            
            var second = Item.create().
            	type(ItemType.Weapon).
            	take(character);
            
            var other = Item.create().
            	type(ItemType.None).
            	take(character);
            
            expect(character.mayWield(second)).toBe(true);
            expect(character.mayWield(other)).toBe(true);
            
            first.wield();
            
            expect(character.mayWield(second)).toBe(false);
            expect(character.mayWield(other)).toBe(true);
        });
    });
});
