"use strict";

var Item  = require('../../src/htmud/character'),
    Root  = require('../../src/htmud/root'),
    field = require('../../src/magic').field,
    event = require('../../src/magic').event;

describe("Item", function () {
    it("is a Root", function () {
        expect(Item.is(Root)).toBe(true);
    });
    
    describe("bearer", function () {
        it("is a field", function () {
            expect(Item.ref('bearer').is(field)).toBe(true);
        });
    });
    
    describe("stow", function () {
        it("is an event", function () {
            expect(Item.ref('stow').is(event)).toBe(true);
        });
    });
    
    describe("drop", function () {
        it("is an event", function () {
            expect(Item.ref('drop').is(event)).toBe(true);
        });
    });
    
    describe("wield", function () {
        it("adds an item to its bearers list", function () {
        });
        
        it("removes the item from the list when it is stowed", function () {
        });
        
        it("removes the item from the list when it is dropped", function () {
        });
    });
});
